// renderer.js — キャラ表示の更新

const $ = (id) => document.getElementById(id);
let currentLogin = '';

const CARE_NEEDS = [
  { key: 'hunger', warn: '🍗 おなかすいた…',   crit: '🍗 ぺこぺこ！' },
  { key: 'poop',   warn: '💩 もよおしてきた…', crit: '💩 もう限界！' },
  { key: 'thirst', warn: '💧 のどかわいた…',   crit: '💧 カラカラ！' },
  { key: 'weeds',  warn: '🌿 草が伸びてきた…', crit: '🌿 ぼうぼう！' },
];

function applyCare(care) {
  const el = $('care-alert');
  if (!el || !care) return;
  const urgent = CARE_NEEDS
    .map(n => ({ ...n, val: care[n.key] || 0 }))
    .filter(n => n.val >= 60)
    .sort((a, b) => b.val - a.val)[0];
  if (urgent) {
    const isCrit = urgent.val >= 80;
    el.textContent = isCrit ? urgent.crit : urgent.warn;
    el.className = 'care-alert show' + (isCrit ? ' crit' : '');
  } else {
    el.className = 'care-alert';
  }
}

function applyChar(kind, svgKey, stageKey, fallbackEmoji) {
  const svgs = window.CHAR_SVGS;
  const kindSvgs = svgs && svgs[kind];
  // svgKey（バリアント付き）→ stageKey（フォールバック）→ 絵文字 の順で解決
  const svg = kindSvgs && (kindSvgs[svgKey] || kindSvgs[stageKey]);
  const el = $('char');
  if (svg) {
    el.innerHTML = svg;
  } else {
    el.textContent = fallbackEmoji;
  }
}

function applyState(s) {
  if (!s) return;
  currentLogin = s.login || '';

  document.body.className = `${s.kind} ${s.mood.key}`;

  applyChar(s.kind, s.svgKey || s.stage.current.key, s.stage.current.key, s.stage.current.emoji);
  $('face').textContent = `${s.mood.face} ${s.mood.label}`;
  $('name').textContent = s.petName || '';
  $('stage').textContent = s.stage.current.label;
  $('streak').textContent = s.streak > 0 ? `🔥${s.streak}日` : '';
  $('score').textContent = `${s.score}pt`;
  $('progress').style.width = Math.round(s.stage.progress * 100) + '%';

  if (s.stage.next) {
    const remain = Math.max(0, s.stage.next.min - s.score);
    $('next').textContent = `次まで${remain}`;
  } else {
    $('next').textContent = 'MAX';
  }

  applyCare(s.care);
  $('hint').textContent = s.stage.current.desc;
}

window.api.on('state-update', applyState);

window.api.on('config-update', (cfg) => {
  if (cfg) document.body.classList.toggle('plant', cfg.kind === 'plant');
});

window.api.on('need-token', () => {
  $('stage').textContent = 'トークン未設定';
  $('hint').textContent = 'トレイの設定からGitHubトークンを登録してね';
  $('face').textContent = '🔑 まちわびてる';
});

window.api.on('error', (msg) => {
  $('hint').textContent = '取得エラー: ' + (msg || '').slice(0, 40);
});

// "tamago" キーシーケンス検出でデバッグ画面を開く
(function () {
  const SEQ = 'tamago';
  let buf = '';
  let timer = null;
  document.addEventListener('keydown', (e) => {
    buf += e.key.toLowerCase();
    if (!SEQ.startsWith(buf)) buf = e.key.toLowerCase();
    clearTimeout(timer);
    if (buf === SEQ) {
      buf = '';
      window.api.openDebug();
    } else {
      timer = setTimeout(() => { buf = ''; }, 2000);
    }
  });
})();

$('refresh').addEventListener('click', () => {
  $('hint').textContent = '更新中…';
  window.api.refreshNow();
});

$('settings').addEventListener('click', () => {
  if (currentLogin) window.api.openExternal(`https://github.com/${currentLogin}`);
});

$('reset').addEventListener('click', () => {
  if (window.confirm('たまごからやり直しますか？\n成長・お世話の記録がリセットされます。')) {
    $('hint').textContent = 'リセット中…';
    window.api.resetPet();
  }
});

$('help').addEventListener('click', () => {
  window.api.openHelp();
});
