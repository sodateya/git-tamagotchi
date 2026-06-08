// main.js — Electron メインプロセス

const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const { fetchContributions, fetchEvents } = require('./src/github');
const growth = require('./src/growth');

const CONFIG_DIR = path.join(os.homedir(), '.git-tamagotchi');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');
const CACHE_PATH  = path.join(CONFIG_DIR, 'cache.json');
const STATE_PATH  = path.join(CONFIG_DIR, 'state.json');

let petWindow = null;
let settingsWindow = null;
let tray = null;
let refreshTimer = null;

// イベントポーリング用
let isRefreshing = false;
let eventPollTimer = null;
let eventEtag = null;
let eventLogin = null;

// ---------- 設定の読み書き ----------
function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch {
    return { token: '', kind: 'pet', name: '' };
  }
}
function saveConfig(cfg) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8');
}
function loadCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')); } catch { return null; }
}
function saveCache(data) {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch {}
}

// ---------- お世話状態の読み書き ----------
function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8')); } catch { return null; }
}
function saveState(data) {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
    fs.writeFileSync(STATE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch {}
}

// ---------- 旧フォーマット（scoreBaseline）から累積スコア方式への移行 ----------
function migrateState(careState) {
  if (!careState || careState.accumulatedScore !== undefined) return careState;
  const cache = loadCache();
  let accumulatedScore = 0;
  if (careState.scoreBaseline && cache && cache.contributions) {
    const baseline = growth.computeScore(careState.scoreBaseline);
    const current  = growth.computeScore(cache.contributions);
    accumulatedScore = Math.max(0, current - baseline);
  }
  const migrated = {
    ...careState,
    accumulatedScore,
    lastFetchedAt: new Date().toISOString(),
  };
  delete migrated.scoreBaseline;
  delete migrated.prevContributions;
  return migrated;
}

// ---------- データ取得 → 状態を組み立てる ----------

function resolveVariants(careState, stageKey, deltaContributions) {
  const variants = careState.variants || {};
  const branching = ['child', 'adult', 'master', 'leaf', 'bloom', 'tree'];
  if (branching.includes(stageKey) && !variants[stageKey]) {
    variants[stageKey] = growth.rollVariant(deltaContributions);
    careState.variants = variants;
  }
  return careState;
}

function buildState(raw, cfg, careState) {
  const baseScore  = careState ? (careState.accumulatedScore || 0) : 0;
  const ageBonus   = growth.ageBonusScore(careState && careState.birthTime);
  const score      = baseScore + ageBonus;
  const stage      = growth.stageFor(score, cfg.kind || 'pet');
  const today      = new Date().toISOString().slice(0, 10);
  const { streak, daysSince, mood: baseMood } = growth.streakAndMood(raw.daily, today);

  const care = careState
    ? { hunger: careState.hunger || 0, thirst: careState.thirst || 0,
        poop: careState.poop || 0, weeds: careState.weeds || 0 }
    : null;

  const mood = care ? growth.moodWithCare(baseMood, care) : baseMood;

  const variants = (careState && careState.variants) || {};
  const currentVariant = variants[stage.current.key] || 'a';
  const svgKey = growth.svgKey(stage.current.key, currentVariant);

  return {
    kind: cfg.kind || 'pet',
    petName: cfg.name || raw.user.name || raw.user.login,
    login: raw.user.login,
    score,
    baseScore,
    ageBonus,
    stage,
    svgKey,
    currentVariant,
    mood,
    streak,
    daysSince,
    totalContributions: raw.totalContributions,
    fetchedAt: raw.fetchedAt,
    care,
    birthTime: careState && careState.birthTime,
  };
}

async function refresh() {
  if (isRefreshing) return;
  isRefreshing = true;
  try {
    const cfg = loadConfig();
    if (!cfg.token) {
      sendToPet('need-token', null);
      return;
    }

    let careState = loadState();

    // 旧フォーマットからの移行
    if (careState && careState.accumulatedScore === undefined) {
      careState = migrateState(careState);
      saveState(careState);
    }

    const since = careState ? careState.lastFetchedAt : null;
    const raw = await fetchContributions(cfg.token, since);
    saveCache(raw);

    const now = new Date().toISOString();

    if (!careState) {
      // 初回起動: ゼロスタートで状態を初期化
      careState = {
        birthTime: now,
        accumulatedScore: 0,
        lastFetchedAt: raw.fetchedAt,
        hunger: 0,
        thirst: 0,
        poop: 0,
        weeds: 0,
        lastUpdated: now,
      };
    } else {
      // 差分スコアを累積、お世話状態を更新
      const deltaScore  = growth.computeScore(raw.deltaContributions);
      const careUpdated = growth.computeCare(careState, raw.deltaContributions);
      careState = {
        ...careState,
        ...careUpdated,
        accumulatedScore: (careState.accumulatedScore || 0) + deltaScore,
        lastFetchedAt: raw.fetchedAt,
      };
    }

    const previewScore = (careState.accumulatedScore || 0) + growth.ageBonusScore(careState.birthTime);
    const previewStage = growth.stageFor(previewScore, cfg.kind || 'pet');
    careState = resolveVariants(careState, previewStage.current.key, raw.deltaContributions);
    saveState(careState);

    const state = buildState(raw, cfg, careState);
    sendToPet('state-update', state);
    updateTrayTitle(state);

    // ユーザー名が確定したらイベントポーリングを開始（またはログイン変更時に再起動）
    if (state.login && state.login !== eventLogin) {
      startEventPolling(state.login);
    }
  } catch (err) {
    sendToPet('error', String(err.message || err));
  } finally {
    isRefreshing = false;
  }
}

async function resetPet() {
  const now = new Date().toISOString();
  saveState({
    birthTime: now,
    accumulatedScore: 0,
    lastFetchedAt: now,
    hunger: 0,
    thirst: 0,
    poop: 0,
    weeds: 0,
    lastUpdated: now,
    variants: {},
  });
  await refresh();
}

// ---------- GitHub Events API ポーリング ----------

async function pollEvents() {
  if (!eventLogin) return;
  try {
    const cfg = loadConfig();
    if (!cfg.token) return;
    const { hasNew, etag } = await fetchEvents(cfg.token, eventLogin, eventEtag);
    if (etag) eventEtag = etag;
    if (hasNew) {
      // 新しいアクティビティを検知したら即座に refresh
      // 次の poll では ETag をリセットして再チェック
      eventEtag = null;
      await refresh();
    }
  } catch {
    // ポーリングエラーは無視して次回に委ねる
  }
}

function startEventPolling(login) {
  eventLogin = login;
  eventEtag = null;
  if (eventPollTimer) clearInterval(eventPollTimer);
  eventPollTimer = setInterval(pollEvents, 60 * 1000); // 60秒ごと
}

function sendToPet(channel, payload) {
  if (petWindow && !petWindow.isDestroyed()) {
    petWindow.webContents.send(channel, payload);
  }
}

// ---------- ウィンドウ ----------
function createPetWindow() {
  petWindow = new BrowserWindow({
    width: 220,
    height: 260,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  petWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
  petWindow.setVisibleOnAllWorkspaces(true);

  petWindow.webContents.on('did-finish-load', () => {
    const cfg = loadConfig();
    sendToPet('config-update', cfg);
    let careState = loadState();
    if (careState && careState.accumulatedScore === undefined) {
      careState = migrateState(careState);
      saveState(careState);
    }
    const cache = loadCache();
    if (cache) sendToPet('state-update', buildState(cache, cfg, careState));
    refresh();
  });
}

function createHelpWindow() {
  const win = new BrowserWindow({
    width: 380,
    height: 520,
    title: 'お世話ガイド — Git Tamagotchi',
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile(path.join(__dirname, 'src', 'help.html'));
}

function createDebugWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    title: 'Debug — 全キャラ一覧',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile(path.join(__dirname, 'src', 'debug.html'));
}

function createSettingsWindow() {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.focus();
    return;
  }
  settingsWindow = new BrowserWindow({
    width: 420,
    height: 460,
    title: '設定 — Git Tamagotchi',
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  settingsWindow.loadFile(path.join(__dirname, 'src', 'settings.html'));
  settingsWindow.webContents.on('did-finish-load', () => {
    settingsWindow.webContents.send('config-update', loadConfig());
  });
  settingsWindow.on('closed', () => { settingsWindow = null; });
}

// ---------- トレイ ----------
function makeTrayIcon() {
  const size = 16;
  const buf = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const cx = x - 8, cy = y - 8;
      const inside = cx * cx + cy * cy <= 36;
      buf[i] = 0x4a; buf[i + 1] = 0xd0; buf[i + 2] = 0x7d;
      buf[i + 3] = inside ? 255 : 0;
    }
  }
  return nativeImage.createFromBuffer(buf, { width: size, height: size });
}

function buildTrayMenu() {
  const cfg = loadConfig();
  return Menu.buildFromTemplate([
    { label: 'いま更新する', click: () => refresh() },
    { type: 'separator' },
    {
      label: '育てるキャラクター',
      submenu: [
        { label: 'ひよこ 🐣', type: 'radio', checked: cfg.kind === 'pet',
          click: () => { const c = loadConfig(); c.kind = 'pet'; saveConfig(c); sendToPet('config-update', c); refresh(); } },
        { label: 'ねこ 🐱', type: 'radio', checked: cfg.kind === 'cat',
          click: () => { const c = loadConfig(); c.kind = 'cat'; saveConfig(c); sendToPet('config-update', c); refresh(); } },
        { label: 'スライム 🟢', type: 'radio', checked: cfg.kind === 'slime',
          click: () => { const c = loadConfig(); c.kind = 'slime'; saveConfig(c); sendToPet('config-update', c); refresh(); } },
        { label: '植物 🌱', type: 'radio', checked: cfg.kind === 'plant',
          click: () => { const c = loadConfig(); c.kind = 'plant'; saveConfig(c); sendToPet('config-update', c); refresh(); } },
        { label: 'きのこ 🍄', type: 'radio', checked: cfg.kind === 'mushroom',
          click: () => { const c = loadConfig(); c.kind = 'mushroom'; saveConfig(c); sendToPet('config-update', c); refresh(); } },
      ],
    },
    { label: '設定を開く…', click: () => createSettingsWindow() },
    { type: 'separator' },
    { label: '終了', click: () => app.quit() },
  ]);
}

function createTray() {
  tray = new Tray(makeTrayIcon());
  tray.setToolTip('Git Tamagotchi');
  tray.setContextMenu(buildTrayMenu());
  tray.on('click', () => {
    if (petWindow) petWindow.isVisible() ? petWindow.hide() : petWindow.show();
  });
}

function updateTrayTitle(state) {
  if (!tray) return;
  const e = state.stage.current.emoji;
  tray.setToolTip(`${state.petName} ${e} / Lv想定 ${state.score}pt / ${state.streak}日連続`);
  tray.setContextMenu(buildTrayMenu());
}

// ---------- IPC ----------
ipcMain.handle('get-config', () => loadConfig());
ipcMain.handle('save-config', (_e, cfg) => {
  saveConfig(cfg);
  sendToPet('config-update', cfg);
  refresh();
  if (tray) tray.setContextMenu(buildTrayMenu());
  return true;
});
ipcMain.handle('refresh-now', () => refresh());
ipcMain.handle('open-debug', () => createDebugWindow());
ipcMain.handle('reset-pet', () => resetPet());
ipcMain.handle('open-help', () => createHelpWindow());
ipcMain.on('open-external', (_e, url) => shell.openExternal(url));

// ---------- 起動 ----------
app.whenReady().then(() => {
  if (process.platform === 'darwin' && app.dock) app.dock.hide();
  createPetWindow();
  createTray();
  refreshTimer = setInterval(refresh, 30 * 60 * 1000); // 30分ごとにフォールバック更新
});

app.on('window-all-closed', (e) => {
  // 常駐アプリなので閉じても終了しない（トレイから操作）
});
app.on('before-quit', () => {
  if (refreshTimer) clearInterval(refreshTimer);
  if (eventPollTimer) clearInterval(eventPollTimer);
});
