// debug.js — 全キャラSVG一覧を描画

const KINDS_INFO = [
  { kind: 'pet',      label: 'ひよこ 🐣',   stages: ['egg','baby','child','adult','master'] },
  { kind: 'cat',      label: 'ねこ 🐱',     stages: ['egg','baby','child','adult','master'] },
  { kind: 'slime',    label: 'スライム 🟢', stages: ['egg','baby','child','adult','master'] },
  { kind: 'plant',    label: '植物 🌱',     stages: ['seed','sprout','leaf','bloom','tree'] },
  { kind: 'mushroom', label: 'きのこ 🍄',   stages: ['seed','sprout','leaf','bloom','tree'] },
];

const BRANCHING = ['child', 'adult', 'master', 'leaf', 'bloom', 'tree'];

function buildCard(svgs, key, labelText) {
  const card = document.createElement('div');
  card.className = 'char-card';

  const svg = svgs && svgs[key];
  if (svg) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = svg;
    const svgEl = wrapper.firstElementChild;
    if (svgEl) {
      svgEl.setAttribute('width', '48');
      svgEl.setAttribute('height', '48');
      card.appendChild(svgEl);
    }
  } else {
    const fb = document.createElement('div');
    fb.className = 'char-fallback';
    fb.textContent = '?';
    card.appendChild(fb);
  }

  const label = document.createElement('div');
  label.className = 'char-label';
  label.textContent = labelText;
  card.appendChild(label);

  const keyEl = document.createElement('div');
  keyEl.className = 'char-key';
  keyEl.textContent = key;
  card.appendChild(keyEl);

  return card;
}

function render() {
  const root = document.getElementById('root');
  const svgs = window.CHAR_SVGS || {};

  KINDS_INFO.forEach(({ kind, label, stages }) => {
    const section = document.createElement('div');
    section.className = 'kind-section';

    const title = document.createElement('div');
    title.className = 'kind-title';
    title.textContent = label;
    section.appendChild(title);

    const row = document.createElement('div');
    row.className = 'stage-row';

    stages.forEach(stageKey => {
      const kindSvgs = svgs[kind] || {};
      // base (variant a)
      row.appendChild(buildCard(kindSvgs, stageKey, stageKey));

      // variants b and c for branching stages
      if (BRANCHING.includes(stageKey)) {
        ['b', 'c'].forEach(v => {
          const vKey = stageKey + '_' + v;
          if (kindSvgs[vKey]) {
            row.appendChild(buildCard(kindSvgs, vKey, stageKey + ' ' + v));
          }
        });
      }
    });

    section.appendChild(row);
    root.appendChild(section);
  });
}

render();
