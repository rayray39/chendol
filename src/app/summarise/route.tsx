
export async function POST(request: Request) {
    const { readmeContent } = await request.json();

    const prompt = `
        You are an assistant that summarizes GitHub repository README files.

        Your goal is to produce a concise and structured summary that helps developers quickly understand what the project does.

        Given the README below, produce a summary with the following sections:

        1. Project Overview – A short explanation of what the project does. (1-2 lines)
        2. Key Features – The main capabilities or features of the project. (1-2 lines)
        3. Tech Stack – Technologies, frameworks, or languages used.
        4. How It Works – A short explanation of how the project functions. (1-2 lines)

        Rules:
        - Keep the summary clear and concise.
        - Use bullet points where appropriate.
        - Do not repeat large parts of the README.
        - If a section is not present, omit it.

        README:
        ${readmeContent}
    ` 

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`,
            // "HTTP-Referer": "chendol-ai.vercel.app", // Optional. Site URL for rankings on openrouter.ai.
            // "X-OpenRouter-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "google/gemma-3-4b-it:free",
            "messages": [
                {
                    "role": "user",
                    content: prompt
                }
            ]
        })
    })
    console.log(res.status);
    const data = await res.json();
    const summary = data.choices?.[0]?.message?.content ?? "No summary generated";

    return Response.json({ summary: summary })
}