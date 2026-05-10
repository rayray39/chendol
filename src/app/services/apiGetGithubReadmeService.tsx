/**
 * API service for fetching GitHub README raw content
 */

/**
 * Fetches the raw README content for the given GitHub repository URL
 * @param githubUrl - The URL of the GitHub repository
 * @returns The raw text from the API
 */
export async function getGithubReadme(githubUrl: string): Promise<string> {
    const res = await fetch('/github_readme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ githubUrl })
    });

    const data = await res.json();
    return data.readmeContent;
}