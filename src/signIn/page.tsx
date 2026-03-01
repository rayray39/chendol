import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"


export default function SignIn() {
    return (
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="sign-in-email">Email</FieldLabel>
                <Input id="sign-in-email" type="text" placeholder="johndoe@example.com" />
            </Field>

            <Field>
                <FieldLabel htmlFor="sign-in-otp">One-Time-Password</FieldLabel>
                <Input id="sign-in-otp" type="password" placeholder="Enter OTP" />
            </Field>

            <Field orientation="horizontal" className="justify-center">
                <Button className="sign-in-button" variant="outline">Get OTP</Button>
                <Button className="sign-in-button" type="submit">Submit</Button>
            </Field>
        </FieldGroup>
    )
}