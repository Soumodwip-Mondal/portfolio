import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN
});

const owner = import.meta.env.VITE_GITHUB_OWNER || '';
const repo = import.meta.env.VITE_GITHUB_REPO || '';

export interface GitHubFile {
    path: string;
    content: string;
    message: string;
}

/**
 * Get file content from GitHub repository
 */
export async function getFileFromGitHub(path: string): Promise<string> {
    try {
        const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path,
        });

        if ('content' in data) {
            return Buffer.from(data.content, 'base64').toString('utf-8');
        }
        throw new Error('File not found');
    } catch (error) {
        console.error(`Error fetching ${path} from GitHub:`, error);
        throw error;
    }
}

/**
 * Update or create file in GitHub repository
 */
export async function updateFileInGitHub(file: GitHubFile): Promise<void> {
    try {
        // First, try to get the file to get its SHA
        let sha: string | undefined;
        try {
            const { data } = await octokit.repos.getContent({
                owner,
                repo,
                path: file.path,
            });
            if ('sha' in data) {
                sha = data.sha;
            }
        } catch (error) {
            // File doesn't exist, which is fine for new files
            console.log('File does not exist yet, creating new file');
        }

        // Update or create the file
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: file.path,
            message: file.message,
            content: Buffer.from(file.content).toString('base64'),
            sha,
        });

        console.log(`Successfully updated ${file.path} in GitHub`);
    } catch (error) {
        console.error(`Error updating ${file.path} in GitHub:`, error);
        throw error;
    }
}

/**
 * Sync local data to GitHub
 */
export async function syncToGitHub(data: any, fileName: string): Promise<void> {
    const content = JSON.stringify(data, null, 2);
    const message = `Update ${fileName} via Admin Panel - ${new Date().toLocaleString()}`;

    await updateFileInGitHub({
        path: `public/data/${fileName}`,
        content,
        message,
    });
}
