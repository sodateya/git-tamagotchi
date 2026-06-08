// main.js — Electron メインプロセス

const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const { fetchContributions } = require('./src/github');
const growth = require('./src/growth');

const CONFIG_DIR = path.join(os.homedir(), '.git-tamagotchi');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');
const CACHE_PATH = path.join(CONFIG_DIR, 'cache.json');

let petWindow = null;
let settingsWindow = null;
let tray = null;
let refreshTimer = null;

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

// ---------- データ取得 → 状態を組み立てる ----------
function buildState(raw, cfg) {
  const score = growth.computeScore(raw.contributions);
  const stage = growth.stageFor(score, cfg.kind || 'pet');
  const today = new Date().toISOString().slice(0, 10);
  const { streak, daysSince, mood } = growth.streakAndMood(raw.daily, today);
  return {
    kind: cfg.kind || 'pet',
    petName: cfg.name || raw.user.name || raw.user.login,
    login: raw.user.login,
    score,
    stage,
    mood,
    streak,
    daysSince,
    contributions: raw.contributions,
    totalContributions: raw.totalContributions,
    fetchedAt: raw.fetchedAt,
  };
}

async function refresh() {
  const cfg = loadConfig();
  if (!cfg.token) {
    sendToPet('need-token', null);
    return;
  }
  try {
    const raw = await fetchContributions(cfg.token);
    saveCache(raw);
    const state = buildState(raw, cfg);
    sendToPet('state-update', state);
    updateTrayTitle(state);
  } catch (err) {
    sendToPet('error', String(err.message || err));
  }
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
    const cache = loadCache();
    if (cache) sendToPet('state-update', buildState(cache, cfg));
    refresh();
  });
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
  // 16x16 の単純なドット画像をコードで生成（外部アセット不要）
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
      label: '育てる対象',
      submenu: [
        { label: 'ペット 🐣', type: 'radio', checked: cfg.kind !== 'plant',
          click: () => { const c = loadConfig(); c.kind = 'pet'; saveConfig(c); sendToPet('config-update', c); refresh(); } },
        { label: '植物 🌱', type: 'radio', checked: cfg.kind === 'plant',
          click: () => { const c = loadConfig(); c.kind = 'plant'; saveConfig(c); sendToPet('config-update', c); refresh(); } },
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
ipcMain.on('open-external', (_e, url) => shell.openExternal(url));

// ---------- 起動 ----------
app.whenReady().then(() => {
  if (process.platform === 'darwin' && app.dock) app.dock.hide(); // macOSはDockに出さない
  createPetWindow();
  createTray();
  refreshTimer = setInterval(refresh, 30 * 60 * 1000); // 30分ごとに更新
});

app.on('window-all-closed', (e) => {
  // 常駐アプリなので閉じても終了しない（トレイから操作）
});
app.on('before-quit', () => { if (refreshTimer) clearInterval(refreshTimer); });
