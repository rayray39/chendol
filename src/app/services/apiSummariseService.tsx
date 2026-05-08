/**
 * API service for summarising GitHub repositories
 */

/**
 * Fetches a summary for the given GitHub repository URL
 * @param githubUrl - The URL of the GitHub repository
 * @returns The summary text from the API
 */
export async function summariseGitHubRepo(githubUrl: string): Promise<string> {
    const res = await fetch('/summarise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ githubUrl })
    });

    const data = await res.json();
    return data.summary;
}