import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN
});

const username = import.meta.env.VITE_GITHUB_OWNER || 'Soumodwip-Mondal';

export interface GitHubStats {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    totalCommits: number;
    contributions: Array<{ date: string; contributions: number }>;
    topLanguages: Array<{ name: string; value: number }>;
    recentActivity: Array<{ type: string; repo: string; date: string }>;
    repositories: Array<{
        name: string;
        stars: number;
        forks: number;
        language: string;
        description: string;
    }>;
}

/**
 * Fetch user's GitHub profile stats
 */
export async function fetchGitHubStats(): Promise<GitHubStats> {
    try {
        // Fetch user data
        const { data: user } = await octokit.users.getByUsername({ username });

        // Fetch repositories
        const { data: repos } = await octokit.repos.listForUser({
            username,
            sort: 'updated',
            per_page: 100,
        });

        // Calculate total stars and forks
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

        // Get top languages
        const languageCounts: Record<string, number> = {};
        repos.forEach(repo => {
            if (repo.language) {
                languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            }
        });

        const topLanguages = Object.entries(languageCounts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6);

        // Get repository details for top repos by stars
        const repositories = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
            .slice(0, 10)
            .map(repo => ({
                name: repo.name,
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                language: repo.language || 'Unknown',
                description: repo.description || '',
            }));

        // Generate mock contributions for last 30 days (GitHub API doesn't provide this easily)
        const contributions = generateContributions();

        // Fetch recent activity
        const { data: events } = await octokit.activity.listPublicEventsForUser({
            username,
            per_page: 10,
        });

        const recentActivity = events.slice(0, 10).map(event => ({
            type: event.type || 'Unknown',
            repo: event.repo.name,
            date: event.created_at || new Date().toISOString(),
        }));

        return {
            totalRepos: user.public_repos,
            totalStars,
            totalForks,
            totalCommits: 0, // This requires fetching from each repo, expensive
            contributions,
            topLanguages,
            recentActivity,
            repositories,
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        throw error;
    }
}

/**
 * Generate contribution data for the last 30 days
 * Note: GitHub's contribution graph API requires GraphQL
 */
function generateContributions() {
    const contributions = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        // Mock data - in production, use GitHub GraphQL API
        const count = Math.floor(Math.random() * 15);

        contributions.push({
            date: dateStr,
            contributions: count,
        });
    }

    return contributions;
}

/**
 * Fetch repository statistics
 */
export async function fetchRepoStats(repoName: string) {
    try {
        const { data } = await octokit.repos.get({
            owner: username,
            repo: repoName,
        });

        return {
            name: data.name,
            stars: data.stargazers_count,
            forks: data.forks_count,
            watchers: data.watchers_count,
            openIssues: data.open_issues_count,
            language: data.language,
            description: data.description,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };
    } catch (error) {
        console.error(`Error fetching repo stats for ${repoName}:`, error);
        throw error;
    }
}

/**
 * Fetch commit activity
 */
export async function fetchCommitActivity(repoName: string) {
    try {
        const { data } = await octokit.repos.getCommitActivityStats({
            owner: username,
            repo: repoName,
        });

        return data;
    } catch (error) {
        console.error(`Error fetching commit activity for ${repoName}:`, error);
        return [];
    }
}
