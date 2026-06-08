// growth.js — 育成ロジック（メイン/レンダラー両方から利用する純粋ロジック）

const POINTS = {
  commit: 2,
  pullRequest: 8,
  review: 12,
  issue: 4,
};

const STAGES = {
  pet: [
    { min: 0,    key: 'egg',     label: 'たまご',   emoji: '🥚', desc: 'まだ眠っている…コミットで起こそう' },
    { min: 50,   key: 'baby',    label: 'ひな',     emoji: '🐣', desc: '生まれたて！世話を続けよう' },
    { min: 200,  key: 'child',   label: 'こども',   emoji: '🐥', desc: 'すくすく成長中' },
    { min: 600,  key: 'adult',   label: 'おとな',   emoji: '🐔', desc: '一人前のエンジニアペット' },
    { min: 1500, key: 'master',  label: '達人',     emoji: '🦅', desc: '伝説の領域へ' },
  ],
  plant: [
    { min: 0,    key: 'seed',    label: 'たね',     emoji: '🌰', desc: 'まだ土の中…コミットで芽吹かせよう' },
    { min: 50,   key: 'sprout',  label: 'め',       emoji: '🌱', desc: '芽が出た！水やりを続けよう' },
    { min: 200,  key: 'leaf',    label: 'わかば',   emoji: '🌿', desc: '葉が茂ってきた' },
    { min: 600,  key: 'bloom',   label: 'かいか',   emoji: '🌷', desc: '見事に開花' },
    { min: 1500, key: 'tree',    label: '大樹',     emoji: '🌳', desc: '森の主のような大樹' },
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

// 初回起動（誕生）からの時間経過による成長ボーナス（最大240pt）
// コントリビューションなしでも Baby/Child 程度まで成長できる
function ageBonusScore(birthTime) {
  if (!birthTime) return 0;
  const hoursAlive = (Date.now() - new Date(birthTime).getTime()) / (1000 * 3600);
  return Math.min(240, Math.floor(hoursAlive / 24 * 2));
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

// お世話状態を時間経過とコントリビューションの差分で更新する
// careState: { hunger, thirst, poop, weeds, lastUpdated, prevContributions }
// contributions: { commit, pullRequest, review, issue } 現在の GitHub 累計
function computeCare(careState, contributions) {
  const now = Date.now();
  const last = careState.lastUpdated ? new Date(careState.lastUpdated).getTime() : now;
  // 最大1週間分の時間経過を計算（アプリを長期間閉じていた場合の爆発を防ぐ）
  const hoursElapsed = Math.min(Math.max(0, (now - last) / (1000 * 3600)), 168);

  const prev = careState.prevContributions || { commit: 0, pullRequest: 0, review: 0, issue: 0 };
  const delta = {
    commit:      Math.max(0, (contributions.commit || 0)      - (prev.commit || 0)),
    pullRequest: Math.max(0, (contributions.pullRequest || 0) - (prev.pullRequest || 0)),
    review:      Math.max(0, (contributions.review || 0)      - (prev.review || 0)),
    issue:       Math.max(0, (contributions.issue || 0)       - (prev.issue || 0)),
  };

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
    prevContributions: { ...contributions },
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
};
