// growth.js — 育成ロジック（メイン/レンダラー両方から利用する純粋ロジック）

// 1週間チャレンジ想定のポイント設計
// 最小(1コミット/日): ひな  / 普通(5コミット+PR週1): こども
// 活発(10コミット+PR週3): おとな / 超活発(レビューもフル): 達人
const POINTS = {
  commit: 5,
  pullRequest: 20,
  review: 30,
  issue: 10,
};

const STAGES = {
  pet: [
    { min: 0,   key: 'egg',    label: 'たまご',  emoji: '🥚', desc: '眠っている…コミットして起こそう' },
    { min: 30,  key: 'baby',   label: 'ひな',    emoji: '🐣', desc: '生まれたて！毎日ケアしてあげよう' },
    { min: 120, key: 'child',  label: 'こども',  emoji: '🐥', desc: 'すくすく成長中。PRも投げてみよう' },
    { min: 350, key: 'adult',  label: 'おとな',  emoji: '🐔', desc: 'レビューもこなす一人前エンジニア' },
    { min: 800, key: 'master', label: '達人',    emoji: '🦅', desc: '1週間でここまで来た！伝説の域' },
  ],
  plant: [
    { min: 0,   key: 'seed',   label: 'たね',      emoji: '🌰', desc: '土の中…コミットで芽吹かせよう' },
    { min: 30,  key: 'sprout', label: 'め',        emoji: '🌱', desc: '芽が出た！水やり（イシュー）も忘れずに' },
    { min: 120, key: 'leaf',   label: 'わかば',    emoji: '🌿', desc: '葉が茂ってきた。PRで枝を伸ばそう' },
    { min: 350, key: 'bloom',  label: 'かいか',    emoji: '🌷', desc: 'レビューで丁寧に育てた証' },
    { min: 800, key: 'tree',   label: '大樹',      emoji: '🌳', desc: '1週間でここまで！森の主へ' },
  ],
  cat: [
    { min: 0,   key: 'egg',    label: 'まめ',      emoji: '🐾', desc: 'ミステリアスなたまご' },
    { min: 30,  key: 'baby',   label: 'こねこ',    emoji: '🐱', desc: 'ふわふわの赤ちゃんにゃんこ' },
    { min: 120, key: 'child',  label: 'ねこ',      emoji: '😺', desc: 'すばしっこく成長中' },
    { min: 350, key: 'adult',  label: 'りっぱ',    emoji: '🐈', desc: '凛々しい一人前の猫に' },
    { min: 800, key: 'master', label: 'しんぴ',    emoji: '✨', desc: '神秘の力に目覚めた伝説の猫' },
  ],
  slime: [
    { min: 0,   key: 'egg',    label: 'しずく',    emoji: '💧', desc: '小さな一滴のはじまり' },
    { min: 30,  key: 'baby',   label: 'ちびすら',  emoji: '🟢', desc: 'ぷにぷにスライム誕生！' },
    { min: 120, key: 'child',  label: 'スライム',  emoji: '🫧', desc: 'プルプルと成長してきた' },
    { min: 350, key: 'adult',  label: 'こうてい',  emoji: '👑', desc: 'お気に入りの王冠をゲット' },
    { min: 800, key: 'master', label: 'だいおう',  emoji: '🌟', desc: '伝説の魔王スライムが降臨' },
  ],
  mushroom: [
    { min: 0,   key: 'seed',   label: 'ほうし',    emoji: '🟤', desc: '土の中で眠る胞子' },
    { min: 30,  key: 'sprout', label: 'めばえ',    emoji: '🍄', desc: '土を押しのけて出てきた！' },
    { min: 120, key: 'leaf',   label: 'きのこ',    emoji: '🍄', desc: '赤い傘がかわいい' },
    { min: 350, key: 'bloom',  label: 'おおきのこ', emoji: '🍄', desc: 'ずっしりと立派になってきた' },
    { min: 800, key: 'tree',   label: 'まほうのこ', emoji: '✨', desc: '光り輝く伝説のきのこ' },
  ],
};

const MOODS = {
  happy:   { key: 'happy',  label: 'ごきげん',    face: '✨', note: '今日も活動してえらい！' },
  normal:  { key: 'normal', label: 'ふつう',      face: '🙂', note: '元気だよ' },
  hungry:  { key: 'hungry', label: 'おなかすいた', face: '😣', note: 'ごはんがほしい…' },
  sad:     { key: 'sad',    label: 'しょんぼり',  face: '😿', note: '会いに来てくれて嬉しい' },
};

// お世話項目: 時間経過で増加、特定のGitアクションで解消
const CARE_DEFS = {
  hunger: { label: '空腹',   icon: '🍗', decayPerHour: 4,   resolution: 'commit',      recoverPerAction: 20 },
  thirst: { label: '水不足', icon: '💧', decayPerHour: 2,   resolution: 'issue',       recoverPerAction: 30 },
  poop:   { label: 'うんち', icon: '💩', decayPerHour: 1.5, resolution: 'pullRequest', recoverPerAction: 40 },
  weeds:  { label: 'くさ',   icon: '🌿', decayPerHour: 1,   resolution: 'review',      recoverPerAction: 35 },
};

function computeScore(c) {
  return (
    (c.commit || 0) * POINTS.commit +
    (c.pullRequest || 0) * POINTS.pullRequest +
    (c.review || 0) * POINTS.review +
    (c.issue || 0) * POINTS.issue
  );
}

// 初回起動（誕生）からの時間経過による成長ボーナス（最大35pt = 約7日分）
// 何もしなくても1週間でひな手前まで成長し、コミット1件でひなに到達できる
function ageBonusScore(birthTime) {
  if (!birthTime) return 0;
  const hoursAlive = (Date.now() - new Date(birthTime).getTime()) / (1000 * 3600);
  return Math.min(35, Math.floor(hoursAlive / 24 * 5));
}

function stageFor(totalScore, kind) {
  const list = STAGES[kind] || STAGES.pet;
  let current = list[0];
  let next = null;
  for (let i = 0; i < list.length; i++) {
    if (totalScore >= list[i].min) {
      current = list[i];
      next = list[i + 1] || null;
    }
  }
  const progress = next
    ? Math.min(1, (totalScore - current.min) / (next.min - current.min))
    : 1;
  return { current, next, progress };
}

// 進化先バリアントを決定する（a/b/c のいずれか）
// contributions の比率に基づき重み付けランダム
// commit多め→a / PRレビュー多め→b / バランス→c
function rollVariant(contributions) {
  const c = contributions || {};
  const commits  = c.commit || 0;
  const prs      = (c.pullRequest || 0) + (c.review || 0);
  const issues   = c.issue || 0;
  const total    = commits + prs + issues;

  let wA = 2, wB = 2, wC = 2; // 基本は均等
  if (total > 0) {
    if (commits > prs && commits > issues)   wA += 3; // コミット型
    else if (prs > commits && prs > issues)  wB += 3; // PR/レビュー型
    else                                      wC += 3; // バランス型
  }
  const roll = Math.random() * (wA + wB + wC);
  if (roll < wA) return 'a';
  if (roll < wA + wB) return 'b';
  return 'c';
}

// ステージキーに variant サフィックスを付加して SVG キーを返す
// variantA は base キーそのまま（後方互換）
function svgKey(stageKey, variant) {
  if (!variant || variant === 'a') return stageKey;
  return stageKey + '_' + variant;
}

function streakAndMood(dailyCounts, todayStr) {
  const map = new Map(dailyCounts.map((d) => [d.date, d.count]));

  let streak = 0;
  const cursor = new Date(todayStr + 'T00:00:00');
  if (!(map.get(todayStr) > 0)) cursor.setDate(cursor.getDate() - 1);
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (map.get(key) > 0) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }

  let daysSince = Infinity;
  const probe = new Date(todayStr + 'T00:00:00');
  for (let i = 0; i < 60; i++) {
    const key = probe.toISOString().slice(0, 10);
    if (map.get(key) > 0) { daysSince = i; break; }
    probe.setDate(probe.getDate() - 1);
  }

  let mood;
  if (daysSince === 0) mood = MOODS.happy;
  else if (daysSince <= 2) mood = MOODS.normal;
  else if (daysSince <= 6) mood = MOODS.hungry;
  else mood = MOODS.sad;

  return { streak, daysSince, mood };
}

// お世話状態を時間経過とコントリビューション差分で更新する
// careState: { hunger, thirst, poop, weeds, lastUpdated }
// deltaContributions: { commit, pullRequest, review, issue } 前回フェッチ以降の増分
function computeCare(careState, deltaContributions) {
  const now = Date.now();
  const last = careState.lastUpdated ? new Date(careState.lastUpdated).getTime() : now;
  // 最大1週間分の時間経過を計算（アプリを長期間閉じていた場合の爆発を防ぐ）
  const hoursElapsed = Math.min(Math.max(0, (now - last) / (1000 * 3600)), 168);
  const delta = deltaContributions || {};

  const resolve = (current, careKey, actionKey) => {
    const def = CARE_DEFS[careKey];
    let val = (current || 0) + hoursElapsed * def.decayPerHour;
    // 1回の更新で最大5件分の効果（急激な変化を緩和）
    val -= Math.min(delta[actionKey] || 0, 5) * def.recoverPerAction;
    return Math.max(0, Math.min(100, val));
  };

  return {
    hunger: resolve(careState.hunger, 'hunger', 'commit'),
    thirst: resolve(careState.thirst, 'thirst', 'issue'),
    poop:   resolve(careState.poop,   'poop',   'pullRequest'),
    weeds:  resolve(careState.weeds,  'weeds',  'review'),
    lastUpdated: new Date(now).toISOString(),
  };
}

// ケア状態を考慮してムードを決定する（お世話不足は活動状況より優先）
function moodWithCare(baseMood, care) {
  const max = Math.max(
    care.hunger || 0,
    care.thirst || 0,
    care.poop || 0,
    care.weeds || 0,
  );
  if (max < 80) return baseMood;
  if ((care.hunger || 0) >= 80) return MOODS.hungry;
  return MOODS.sad;
}

module.exports = {
  POINTS, STAGES, MOODS, CARE_DEFS,
  computeScore, ageBonusScore, stageFor, streakAndMood, computeCare, moodWithCare,
  rollVariant, svgKey,
};
