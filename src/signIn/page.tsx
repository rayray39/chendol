import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { SetStateAction, useState } from "react"


export default function SignIn() {
    const [isEmailEntered, setIsEmailEntered] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        // handle email input change
        setEmail(event.target.value);
        if (event.target.value.length > 0) {
            setIsEmailEntered(true);
        } else {
            setIsEmailEntered(false);
        }
    }

    const handleGetOTP = () => {
        // handle get otp button clicked
        console.log('otp button clicked, sending otp to email...');
    }

    const handleSubmit = () => {
        // handle submit button clicked
        console.log(`entered email: ${email}`)
        setEmail('');
    }

    return (
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="sign-in-email">Email</FieldLabel>
                <Input 
                    id="sign-in-email" 
                    type="text" 
                    placeholder="johndoe@example.com" 
                    value={email}
                    onChange={handleEmailChange}
                />
            </Field>

            <Field>
                <FieldLabel htmlFor="sign-in-otp">One-Time-Password</FieldLabel>
                <Input id="sign-in-otp" type="password" placeholder="Enter OTP" />
            </Field>

            <Field orientation="horizontal" className="justify-center">
                <Button disabled={!isEmailEntered} className="sign-in-button" variant="outline" onClick={handleGetOTP}>Get OTP</Button>
                <Button className="sign-in-button" type="submit" onClick={handleSubmit}>Submit</Button>
            </Field>
        </FieldGroup>
    )
}