// renderer.js — キャラ表示の更新

const $ = (id) => document.getElementById(id);
let currentLogin = '';

function applyState(s) {
  if (!s) return;
  currentLogin = s.login || '';

  document.body.className = `${s.kind} ${s.mood.key}`;

  $('char').textContent = s.stage.current.emoji;
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

$('refresh').addEventListener('click', () => {
  $('hint').textContent = '更新中…';
  window.api.refreshNow();
});

$('settings').addEventListener('click', () => {
  if (currentLogin) window.api.openExternal(`https://github.com/${currentLogin}`);
});
