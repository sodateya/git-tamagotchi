// growth.js — 育成ロジック（メイン/レンダラー両方から利用する純粋ロジック）

// 各アクティビティのポイント配分。レビューは「他者への貢献」として厚めに評価。
const POINTS = {
  commit: 2,
  pullRequest: 8,
  review: 12,
  issue: 4,
};

// ステージ定義（累計スコアのしきい値順）。pet と plant で見た目を変える。
const STAGES = {
  pet: [
    { min: 0,    key: 'egg',     label: 'たまご',   emoji: '🥚', desc: 'まだ眠っている…コミットで起こそう' },
    { min: 50,   label: 'ひな',   key: 'baby',     emoji: '🐣', desc: '生まれたて！世話を続けよう' },
    { min: 200,  label: 'こども', key: 'child',    emoji: '🐥', desc: 'すくすく成長中' },
    { min: 600,  label: 'おとな', key: 'adult',    emoji: '🐔', desc: '一人前のエンジニアペット' },
    { min: 1500, label: '達人',   key: 'master',   emoji: '🦅', desc: '伝説の領域へ' },
  ],
  plant: [
    { min: 0,    key: 'seed',    label: 'たね',     emoji: '🌰', desc: 'まだ土の中…コミットで芽吹かせよう' },
    { min: 50,   key: 'sprout',  label: 'め',       emoji: '🌱', desc: '芽が出た！水やりを続けよう' },
    { min: 200,  key: 'leaf',    label: 'わかば',   emoji: '🌿', desc: '葉が茂ってきた' },
    { min: 600,  key: 'bloom',   label: 'かいか',   emoji: '🌷', desc: '見事に開花' },
    { min: 1500, key: 'tree',    label: '大樹',     emoji: '🌳', desc: '森の主のような大樹' },
  ],
};

// 元気度（直近の活動量で判定）
const MOODS = {
  happy:    { key: 'happy',    label: 'ごきげん', face: '✨', note: '今日も活動してえらい！' },
  normal:   { key: 'normal',   label: 'ふつう',   face: '🙂', note: '元気だよ' },
  hungry:   { key: 'hungry',   label: 'おなかすいた', face: '😣', note: 'しばらく活動がないみたい…' },
  sad:      { key: 'sad',      label: 'しょんぼり', face: '😿', note: '会いに来てくれて嬉しい' },
};

// contributions: { commit, pullRequest, review, issue } の累計件数
function computeScore(c) {
  return (
    (c.commit || 0) * POINTS.commit +
    (c.pullRequest || 0) * POINTS.pullRequest +
    (c.review || 0) * POINTS.review +
    (c.issue || 0) * POINTS.issue
  );
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

// dailyCounts: [{ date: 'YYYY-MM-DD', count: n }] 昇順。todayStr: 'YYYY-MM-DD'
function streakAndMood(dailyCounts, todayStr) {
  const map = new Map(dailyCounts.map((d) => [d.date, d.count]));

  // 連続日数（今日 or 昨日から遡る）
  let streak = 0;
  const cursor = new Date(todayStr + 'T00:00:00');
  // 今日まだ活動していなくても昨日まで続いていれば streak は維持
  if (!(map.get(todayStr) > 0)) cursor.setDate(cursor.getDate() - 1);
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (map.get(key) > 0) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }

  // 最後に活動した日からの経過日数
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

module.exports = { POINTS, STAGES, MOODS, computeScore, stageFor, streakAndMood };
