
export async function POST(request: Request) {
    const { githubUrl } = await request.json()

    // split githubUrl into owner and repo names

    var owner = 'anthropics'
    var repo = 'financial-services'

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.raw"
        }
    })
    if (!response.ok) {
        throw new Error('GitHub README not found, please ensure the repo exists.');
    }

    const readmeContent = await response.text();
    return Response.json({ readmeContent })
}