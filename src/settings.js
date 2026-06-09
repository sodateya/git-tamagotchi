// settings.js — 設定画面のロジック

const $ = (id) => document.getElementById(id);

const KINDS = ['pet', 'cat', 'slime', 'plant', 'mushroom'];
const COLORS = ['pink','yellow','sky','green','purple','orange','white','navy'];
const PATTERNS = ['solid','dots','stripes','check'];

let selectedColor = 'pink';
let selectedPattern = 'solid';

function selectColor(color) {
  selectedColor = COLORS.includes(color) ? color : 'pink';
  document.querySelectorAll('.swatch').forEach(s =>
    s.classList.toggle('selected', s.dataset.color === selectedColor));
}

function selectPattern(pattern) {
  selectedPattern = PATTERNS.includes(pattern) ? pattern : 'solid';
  document.querySelectorAll('.pattern-btn').forEach(b =>
    b.classList.toggle('selected', b.dataset.pattern === selectedPattern));
}

document.querySelectorAll('.swatch').forEach(s =>
  s.addEventListener('click', () => selectColor(s.dataset.color)));
document.querySelectorAll('.pattern-btn').forEach(b =>
  b.addEventListener('click', () => selectPattern(b.dataset.pattern)));

$('windowScale').addEventListener('input', () => {
  const v = $('windowScale').value;
  $('windowScaleVal').textContent = v + '%';
  window.api.applyAppearance({ windowScale: parseInt(v, 10) });
});
$('windowOpacity').addEventListener('input', () => {
  const v = $('windowOpacity').value;
  $('windowOpacityVal').textContent = v + '%';
  window.api.applyAppearance({ windowOpacity: parseInt(v, 10) });
});

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
  selectColor(cfg.shellColor || 'pink');
  selectPattern(cfg.shellPattern || 'solid');
  const scale = cfg.windowScale || 100;
  const opacity = cfg.windowOpacity || 100;
  $('windowScale').value = scale;
  $('windowScaleVal').textContent = scale + '%';
  $('windowOpacity').value = opacity;
  $('windowOpacityVal').textContent = opacity + '%';
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
    shellColor: selectedColor,
    shellPattern: selectedPattern,
    windowScale: parseInt($('windowScale').value, 10),
    windowOpacity: parseInt($('windowOpacity').value, 10),
  };
  await window.api.saveConfig(cfg);
  $('ok').textContent = '保存しました ✓ キャラに反映されます';
  setTimeout(() => { $('ok').textContent = ''; }, 2500);
});
