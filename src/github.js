// github.js — GitHub GraphQL API クライアント + Events API

const GQL = 'https://api.github.com/graphql';
const REST_BASE = 'https://api.github.com';

// since が指定された場合: since以降のコントリビューション差分 + 直近30日のカレンダーを1リクエストで取得
// since が null の場合（初回）: カレンダーのみ取得してスコアはゼロスタート
async function fetchContributions(token, since) {
  const to = new Date();
  const streakFrom = new Date(to.getTime() - 30 * 24 * 3600 * 1000);

  let query, variables;

  if (since) {
    query = `
      query($since: DateTime!, $to: DateTime!, $streakFrom: DateTime!) {
        viewer {
          login name avatarUrl
          delta: contributionsCollection(from: $since, to: $to) {
            totalCommitContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            totalIssueContributions
          }
          calendar: contributionsCollection(from: $streakFrom, to: $to) {
            contributionCalendar {
              totalContributions
              weeks { contributionDays { date contributionCount } }
            }
          }
        }
      }
    `;
    variables = {
      since: new Date(since).toISOString(),
      to: to.toISOString(),
      streakFrom: streakFrom.toISOString(),
    };
  } else {
    query = `
      query($streakFrom: DateTime!, $to: DateTime!) {
        viewer {
          login name avatarUrl
          calendar: contributionsCollection(from: $streakFrom, to: $to) {
            contributionCalendar {
              totalContributions
              weeks { contributionDays { date contributionCount } }
            }
          }
        }
      }
    `;
    variables = { streakFrom: streakFrom.toISOString(), to: to.toISOString() };
  }

  const res = await fetch(GQL, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'git-tamagotchi',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API エラー (${res.status}): ${text.slice(0, 200)}`);
  }

  const json = await res.json();
  if (json.errors) throw new Error('GraphQL エラー: ' + JSON.stringify(json.errors));

  const v = json.data.viewer;
  const calCC = v.calendar;

  const daily = [];
  for (const week of calCC.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      daily.push({ date: day.date, count: day.contributionCount });
    }
  }
  daily.sort((a, b) => (a.date < b.date ? -1 : 1));

  // delta は since 以降の差分、初回は 0
  const deltaContributions = v.delta ? {
    commit:      v.delta.totalCommitContributions,
    pullRequest: v.delta.totalPullRequestContributions,
    review:      v.delta.totalPullRequestReviewContributions,
    issue:       v.delta.totalIssueContributions,
  } : { commit: 0, pullRequest: 0, review: 0, issue: 0 };

  return {
    user: { login: v.login, name: v.name, avatarUrl: v.avatarUrl },
    deltaContributions,
    totalContributions: calCC.contributionCalendar.totalContributions,
    daily,
    fetchedAt: to.toISOString(),
  };
}

// GitHub Events API でユーザーの最新アクティビティを監視
// ETag を使った条件付きリクエストで API 消費を最小化
async function fetchEvents(token, username, etag) {
  const headers = {
    Authorization: `bearer ${token}`,
    'User-Agent': 'git-tamagotchi',
    Accept: 'application/vnd.github+json',
  };
  if (etag) headers['If-None-Match'] = etag;

  const res = await fetch(
    `${REST_BASE}/users/${encodeURIComponent(username)}/events?per_page=30`,
    { headers }
  );

  // 304 = 変化なし（ETag キャッシュヒット）
  if (res.status === 304) return { hasNew: false, etag };
  if (!res.ok) throw new Error(`Events API エラー (${res.status})`);

  const newEtag = res.headers.get('etag') || res.headers.get('ETag') || null;
  const events = await res.json();

  const RELEVANT = new Set(['PushEvent', 'PullRequestEvent', 'PullRequestReviewEvent', 'IssuesEvent']);
  const hasNew = Array.isArray(events) && events.some(e => RELEVANT.has(e.type));

  return { hasNew, etag: newEtag };
}

module.exports = { fetchContributions, fetchEvents };
