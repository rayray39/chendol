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

    // checks whether github url is entered intp the textarea
    const [isGithubUrlEntered, setIsGithubUrlEntered] = useState<boolean>(false);

    // checks whether github url is filled in before submitting
    const [isGithubUrlEmptyOnSubmit, setIsGithubUrlEmptyOnSubmit] = useState<boolean>(false);
    // checks whether github url is valid before submitting
    const [isGithubUrlValid, setIsGithubUrlValid] = useState<boolean>(true);

    // summary generated 
    const [summary, setSummary] = useState<string>("");

    const handleTextareaChange = (event: { target: { value: string } }) => {
        const value = event.target.value;
        setGithubUrl(value);
        
        if (value.length > 0) {
            // reset all the checks
            setIsGithubUrlEntered(true);
            setIsGithubUrlEmptyOnSubmit(false);
            setIsGithubUrlValid(true)
        } else {
            setIsGithubUrlEntered(false)
            // setIsGithubUrlEmptyOnSubmit(false)
        }
    }

    const handleSummariseButton = async () => {
        // Validate input before making API call
        if (!githubUrl) {
            setIsGithubUrlEmptyOnSubmit(true);
            setIsGithubUrlEntered(false);
            return;
        }
        
        if (!githubUrl.includes('github.com')) {
            setIsGithubUrlValid(false);
            return;
        }

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
                <Field data-invalid={isGithubUrlEmptyOnSubmit || !isGithubUrlValid}>
                    <FieldLabel htmlFor="entered-url">Summarise a Github Repository</FieldLabel>
                    <FieldDescription>Enter the Github repo URL</FieldDescription>
                    <Textarea 
                        id="entered-url" 
                        className="resize-none" 
                        value={githubUrl} 
                        onChange={handleTextareaChange} 
                        placeholder="Enter URL here"
                        aria-invalid={isGithubUrlEmptyOnSubmit || !isGithubUrlValid}
                    />
                    {
                        isGithubUrlEmptyOnSubmit ? 
                        <FieldDescription>
                            GitHub URL cannot be empty.
                        </FieldDescription> :
                        !isGithubUrlValid && githubUrl.length > 0 ?
                        <FieldDescription>
                            Please enter a valid GitHub URL.
                        </FieldDescription> :
                        null
                    }
                </Field>

                <Field>
                    <Button className="cursor-pointer mb-8" onClick={handleSummariseButton}>Summarise</Button>
                </Field>
            </FieldGroup>
        </div>
    )
}