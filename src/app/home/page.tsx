'use client'

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { SetStateAction, useState } from "react"

export default function Home() {
    // github url entered into the textarea
    const [githubUrl, setGithubUrl] = useState("");

    const handleTextareaChange = (event: { target: { value: SetStateAction<string> } }) => {
        setGithubUrl(event.target.value)
    }

    const handleSummariseButton = () => {
        console.log(`github repo url: ${githubUrl}`)
        setGithubUrl('');
    }


    return (
        <div className="grid grid-cols-3 grid-rows-3 h-screen w-full ">
            <FieldGroup className="col-start-2 row-start-2">
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