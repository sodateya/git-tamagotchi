// settings.js — 設定画面のロジック

const $ = (id) => document.getElementById(id);

const KINDS = ['pet', 'cat', 'slime', 'plant', 'mushroom'];

// baby/sprout ステージのSVGをプレビューに表示
function fillPreviews() {
  if (!window.CHAR_SVGS) return;
  const BABY_KEY = { pet: 'baby', cat: 'baby', slime: 'baby', plant: 'sprout', mushroom: 'sprout' };
  KINDS.forEach(kind => {
    const el = $('prev-' + kind);
    if (!el) return;
    const key = BABY_KEY[kind];
    const svg = window.CHAR_SVGS[kind] && window.CHAR_SVGS[kind][key];
    if (svg) el.innerHTML = svg;
  });
}

function fill(cfg) {
  if (!cfg) return;
  $('token').value = cfg.token || '';
  $('name').value = cfg.name || '';
  const kind = KINDS.includes(cfg.kind) ? cfg.kind : 'pet';
  const radio = document.querySelector(`input[name=kind][value=${kind}]`);
  if (radio) radio.checked = true;
}

fillPreviews();
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
