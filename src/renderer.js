// renderer.js — キャラ表示の更新

const $ = (id) => document.getElementById(id);
let currentLogin = '';

// お世話レベルに応じたドットのクラスを返す
function careClass(val) {
  if (val < 30) return '';
  if (val < 60) return 'warn';
  if (val < 80) return 'bad';
  return 'crit';
}

function applyCare(care) {
  if (!care) return;
  const keys = ['hunger', 'thirst', 'poop', 'weeds'];
  keys.forEach(key => {
    const dot = $('dot-' + key);
    if (dot) dot.className = 'care-dot ' + careClass(care[key] || 0);
  });
}

// 深刻なお世話不足があればヒントに表示する（最初の1件）
function careHint(care) {
  if (!care) return null;
  if ((care.hunger || 0) >= 80) return '🍗おなかペコペコ！コミットして！';
  if ((care.thirst || 0) >= 80) return '💧カラカラ！イシューを立てよう';
  if ((care.poop   || 0) >= 80) return '💩そろそろ限界！PRをマージしよう';
  if ((care.weeds  || 0) >= 80) return '🌿ぼうぼう！レビューしよう';
  if ((care.hunger || 0) >= 60) return '🍗おなかすいてきた…コミットして';
  if ((care.thirst || 0) >= 60) return '💧のどかわいた…イシューを立てて';
  if ((care.poop   || 0) >= 60) return '💩もよおしてきた…PRを送ろう';
  if ((care.weeds  || 0) >= 60) return '🌿草が伸びてきた…レビューしよう';
  return null;
}

function applyChar(kind, stageKey, fallbackEmoji) {
  const svgs = window.CHAR_SVGS;
  const svg = svgs && svgs[kind] && svgs[kind][stageKey];
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

  applyChar(s.kind, s.stage.current.key, s.stage.current.emoji);
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

  const hint = careHint(s.care);
  $('hint').textContent = hint || s.stage.current.desc;
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

$('refresh').addEventListener('click', () => {
  $('hint').textContent = '更新中…';
  window.api.refreshNow();
});

$('settings').addEventListener('click', () => {
  if (currentLogin) window.api.openExternal(`https://github.com/${currentLogin}`);
});
