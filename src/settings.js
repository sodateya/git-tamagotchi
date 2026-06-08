// settings.js — 設定画面のロジック

const $ = (id) => document.getElementById(id);

function fill(cfg) {
  if (!cfg) return;
  $('token').value = cfg.token || '';
  $('name').value = cfg.name || '';
  const kind = cfg.kind === 'plant' ? 'plant' : 'pet';
  document.querySelector(`input[name=kind][value=${kind}]`).checked = true;
}

window.api.getConfig().then(fill);
window.api.on('config-update', fill);

$('tokenLink').addEventListener('click', (e) => {
  e.preventDefault();
  window.api.openExternal('https://github.com/settings/tokens/new?scopes=read:user&description=git-tamagotchi');
});

$('save').addEventListener('click', async () => {
  const cfg = {
    token: $('token').value.trim(),
    name: $('name').value.trim(),
    kind: document.querySelector('input[name=kind]:checked').value,
  };
  await window.api.saveConfig(cfg);
  $('ok').textContent = '保存しました ✓ キャラに反映されます';
  setTimeout(() => { $('ok').textContent = ''; }, 2500);
});
