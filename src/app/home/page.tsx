'use client'

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { summariseGitHubRepo } from "@/app/services/apiSummariseService"
import { SetStateAction, useState } from "react"

export default function Home() {
    // tracks the position of the div
    const [isDivAtBottom, setIsDivAtBottom] = useState<boolean>(false);

    // github url entered into the textarea
    const [githubUrl, setGithubUrl] = useState<string>("");

    // summary generated 
    const [summary, setSummary] = useState<string>("");

    const handleTextareaChange = (event: { target: { value: SetStateAction<string> } }) => {
        setGithubUrl(event.target.value)
    }

    const handleSummariseButton = async () => {
        console.log(`github repo url: ${githubUrl}`)
        setIsDivAtBottom(true)
        try {
            const summaryResult = await summariseGitHubRepo(githubUrl);
            setSummary(summaryResult)
        } catch (error) {
            // print error message
            setSummary("Failed to generate a summary, please try agin later.");
            console.log(error)
        } finally {
            setGithubUrl('');
        }
    }


    return (
        <div className='grid grid-cols-3 grid-rows-5 h-screen w-full'>
            <FieldGroup className="col-start-2 row-start-2">
                <Field>
                    {summary}
                </Field>
            </FieldGroup>
            <FieldGroup className={`col-start-2 row-start-3 ${isDivAtBottom ? "translate-y-[32vh]" : "translate-y-0"} transition-all duration-2000 ease-in-out`}>
                <Field>
                    <FieldLabel htmlFor="entered-url">Summarise a Github Repository</FieldLabel>
                    <FieldDescription>Enter the Github repo URL</FieldDescription>
                    <Textarea id="entered-url" className="resize-none" value={githubUrl} onChange={handleTextareaChange} placeholder="Enter URL here"/>
                </Field>

                <Field>
                    <Button className="cursor-pointer" onClick={handleSummariseButton}>Summarise</Button>
                </Field>
            </FieldGroup>
        </div>
    )
}