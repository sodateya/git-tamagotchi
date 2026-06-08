// shinka.js — 進化条件シートの描画

const KINDS = [
  {
    kind: 'pet', label: 'ひよこ 🐣',
    stages: [
      { key: 'egg',    label: 'たまご',   min: 0,   desc: '眠っている…コミットして起こそう' },
      { key: 'baby',   label: 'ひな',     min: 30,  desc: '生まれたて！毎日ケアしてあげよう' },
      { key: 'child',  label: 'こども',   min: 120, desc: 'すくすく成長中。PRも投げてみよう' },
      { key: 'adult',  label: 'おとな',   min: 350, desc: 'レビューもこなす一人前エンジニア' },
      { key: 'master', label: '達人',     min: 800, desc: '1週間でここまで来た！伝説の域' },
    ],
  },
  {
    kind: 'cat', label: 'ねこ 🐱',
    stages: [
      { key: 'egg',    label: 'まめ',     min: 0,   desc: 'ミステリアスなたまご' },
      { key: 'baby',   label: 'こねこ',   min: 30,  desc: 'ふわふわの赤ちゃんにゃんこ' },
      { key: 'child',  label: 'ねこ',     min: 120, desc: 'すばしっこく成長中' },
      { key: 'adult',  label: 'りっぱ',   min: 350, desc: '凛々しい一人前の猫に' },
      { key: 'master', label: 'しんぴ',   min: 800, desc: '神秘の力に目覚めた伝説の猫' },
    ],
  },
  {
    kind: 'slime', label: 'スライム 🟢',
    stages: [
      { key: 'egg',    label: 'しずく',   min: 0,   desc: '小さな一滴のはじまり' },
      { key: 'baby',   label: 'ちびすら', min: 30,  desc: 'ぷにぷにスライム誕生！' },
      { key: 'child',  label: 'スライム', min: 120, desc: 'プルプルと成長してきた' },
      { key: 'adult',  label: 'こうてい', min: 350, desc: 'お気に入りの王冠をゲット' },
      { key: 'master', label: 'だいおう', min: 800, desc: '伝説の魔王スライムが降臨' },
    ],
  },
  {
    kind: 'plant', label: '植物 🌱',
    stages: [
      { key: 'seed',   label: 'たね',       min: 0,   desc: '土の中…コミットで芽吹かせよう' },
      { key: 'sprout', label: 'め',         min: 30,  desc: '芽が出た！イシューも忘れずに' },
      { key: 'leaf',   label: 'わかば',     min: 120, desc: '葉が茂ってきた。PRで枝を伸ばそう' },
      { key: 'bloom',  label: 'かいか',     min: 350, desc: 'レビューで丁寧に育てた証' },
      { key: 'tree',   label: '大樹',       min: 800, desc: '1週間でここまで！森の主へ' },
    ],
  },
  {
    kind: 'mushroom', label: 'きのこ 🍄',
    stages: [
      { key: 'seed',   label: 'ほうし',     min: 0,   desc: '土の中で眠る胞子' },
      { key: 'sprout', label: 'めばえ',     min: 30,  desc: '土を押しのけて出てきた！' },
      { key: 'leaf',   label: 'きのこ',     min: 120, desc: '赤い傘がかわいい' },
      { key: 'bloom',  label: 'おおきのこ', min: 350, desc: 'ずっしりと立派になってきた' },
      { key: 'tree',   label: 'まほうのこ', min: 800, desc: '光り輝く伝説のきのこ' },
    ],
  },
];

function buildStageCard(kind, stage) {
  const kindSvgs = (window.CHAR_SVGS && window.CHAR_SVGS[kind]) || {};
  const svg = kindSvgs[stage.key];

  const card = document.createElement('div');
  card.className = 'stage-card';

  if (svg) {
    const wrap = document.createElement('div');
    wrap.innerHTML = svg;
    const svgEl = wrap.firstElementChild;
    if (svgEl) {
      svgEl.setAttribute('width', '44');
      svgEl.setAttribute('height', '44');
      card.appendChild(svgEl);
    }
  } else {
    const fb = document.createElement('div');
    fb.className = 'char-fallback';
    fb.textContent = '?';
    card.appendChild(fb);
  }

  const nameEl = document.createElement('div');
  nameEl.className = 'stage-name';
  nameEl.textContent = stage.label;
  card.appendChild(nameEl);

  const ptEl = document.createElement('div');
  ptEl.className = 'stage-pt' + (stage.min === 0 ? ' start' : '');
  ptEl.textContent = stage.min === 0 ? 'スタート' : `${stage.min}pt～`;
  card.appendChild(ptEl);

  const descEl = document.createElement('div');
  descEl.className = 'stage-desc';
  descEl.textContent = stage.desc;
  card.appendChild(descEl);

  return card;
}

function render() {
  const root = document.getElementById('root');

  KINDS.forEach(({ kind, label, stages }) => {
    const section = document.createElement('div');
    section.className = 'kind-section';

    const title = document.createElement('div');
    title.className = 'kind-title';
    title.textContent = label;
    section.appendChild(title);

    const row = document.createElement('div');
    row.className = 'evolution-row';

    stages.forEach((stage, i) => {
      if (i > 0) {
        const arrowWrap = document.createElement('div');
        arrowWrap.className = 'arrow-wrap';
        arrowWrap.innerHTML = '<span class="arrow">›</span>';
        row.appendChild(arrowWrap);
      }
      row.appendChild(buildStageCard(kind, stage));
    });

    section.appendChild(row);
    root.appendChild(section);
  });
}

render();
