// github.js — GitHub GraphQL API クライアント

const GQL = 'https://api.github.com/graphql';

// 過去1年ぶんの貢献サマリと日別カレンダーを取得
async function fetchContributions(token) {
  const to = new Date();
  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);

  const query = `
    query($from: DateTime!, $to: DateTime!) {
      viewer {
        login
        name
        avatarUrl
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GQL, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'git-tamagotchi',
    },
    body: JSON.stringify({ query, variables: { from: from.toISOString(), to: to.toISOString() } }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API エラー (${res.status}): ${text.slice(0, 200)}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error('GraphQL エラー: ' + JSON.stringify(json.errors));
  }

  const v = json.data.viewer;
  const cc = v.contributionsCollection;

  // 日別カレンダーを平坦化（昇順）
  const daily = [];
  for (const week of cc.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      daily.push({ date: day.date, count: day.contributionCount });
    }
  }
  daily.sort((a, b) => (a.date < b.date ? -1 : 1));

  return {
    user: { login: v.login, name: v.name, avatarUrl: v.avatarUrl },
    contributions: {
      commit: cc.totalCommitContributions,
      pullRequest: cc.totalPullRequestContributions,
      review: cc.totalPullRequestReviewContributions,
      issue: cc.totalIssueContributions,
    },
    totalContributions: cc.contributionCalendar.totalContributions,
    daily,
    fetchedAt: new Date().toISOString(),
  };
}

module.exports = { fetchContributions };
