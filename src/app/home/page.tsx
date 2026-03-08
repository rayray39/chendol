'use client'

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
    return (
        <div className="grid grid-cols-3 grid-rows-3 h-screen w-full ">
            <FieldGroup className="col-start-2 row-start-2">
                <Field>
                    <FieldLabel htmlFor="entered-url">Summarise a Github Repository</FieldLabel>
                    <FieldDescription>Enter the Github repo URL</FieldDescription>
                    <Textarea id="entered-url" className="resize-none" placeholder="Enter URL here"/>
                </Field>

                <Field>
                    <Button className="cursor-pointer">Summarise</Button>
                </Field>
            </FieldGroup>
        </div>
    )
}