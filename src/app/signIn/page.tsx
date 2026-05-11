'use client';

import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { SetStateAction, useState } from "react"
import { useRouter } from "next/navigation";


export default function SignIn() {
    // checks whether email is entered into text field
    const [isEmailEntered, setIsEmailEntered] = useState<boolean>(false);

    // control inputs (email and otp)
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');

    // checks whether email and otp are filled in before submitting
    const [isEmailEmptyOnSubmit, setIsEmailEmptyOnSubmit] = useState<boolean>(false);
    const [isOtpEmptyOnSubmit, setIsOtpEmptyOnSubmit] = useState<boolean>(false);

    // checks whether email is valid
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

    const router = useRouter();

    const suspiciousEmail = (email:string) => {
        // dragonhunter@gmail.com
        const trimmed_email = email.trim()  // remove any trailing and leading whitespaces
        if (trimmed_email.split(" ").length > 1) {
            // eg. 'dragonhunter@gmail.com random_text other_random_text' 
            return true;
        }
        if (!trimmed_email.includes("@")) {
            return true;
        }
        // perform checks on username
        const userEmailUsername = trimmed_email.split("@")[0]   // dragonhunter
        // perform checks on domain
        const userEmailDomain = trimmed_email.split("@")[1]     // gmail.com
        const commonEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
        if (!commonEmailDomains.includes(userEmailDomain)) {
            return true
        }

        return false
    }

    const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        // handle email input change
        setEmail(event.target.value);
        if (event.target.value.length > 0) {
            setIsEmailEntered(true);
            setIsEmailEmptyOnSubmit(false);
        } else {
            setIsEmailEntered(false);
        }
        setIsEmailValid(true)
    }

    const handleOtpChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        // handle otp input change
        setOtp(event.target.value);
        if (event.target.value.length > 0) {
            setIsOtpEmptyOnSubmit(false);
        } else {
            setIsOtpEmptyOnSubmit(true);
        }
    }

    const handleGetOTP = () => {
        // handle get otp button clicked
        // TODO: include validation logic
        console.log('otp button clicked, sending otp to email...');
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // handle submit button clicked
        if (!email) {
            // no email entered
            setIsEmailEmptyOnSubmit(true);
            setIsEmailEntered(false);
            return;
        }
        if (!otp) {
            // no otp entered
            setIsOtpEmptyOnSubmit(true);
            return;
        }
        console.log(`entered email: ${email}`);
        if (suspiciousEmail(email)) {
            setIsEmailValid(false)
            return;
        }
        // validate OTP before navigation
        router.push('/home')
        // setEmail('');
        // setOtp('');
    }

    return (
        <FieldGroup>
            <Field data-invalid={isEmailEmptyOnSubmit || !isEmailValid}>
                <FieldLabel htmlFor="sign-in-email">Email</FieldLabel>
                <Input 
                    id="sign-in-email" 
                    type="text" 
                    placeholder="johndoe@example.com" 
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={isEmailEmptyOnSubmit || !isEmailValid}
                />
                {
                    isEmailEmptyOnSubmit ? 
                    <FieldDescription>
                        Email cannot be empty.
                    </FieldDescription> : (
                        isEmailValid ? null : <FieldDescription>Please enter a valid email.</FieldDescription>
                    )
                }
            </Field>

            <Field data-invalid={isOtpEmptyOnSubmit}>
                <FieldLabel htmlFor="sign-in-otp">One-Time-Password</FieldLabel>
                <Input
                    id="sign-in-otp" 
                    type="password" 
                    placeholder="Enter OTP" 
                    value={otp}
                    onChange={handleOtpChange}
                    aria-invalid={isOtpEmptyOnSubmit}
                />
                {
                    isOtpEmptyOnSubmit ? 
                    <FieldDescription>
                        OTP cannot be empty.
                    </FieldDescription> :
                    null
                }
            </Field>

            <Field orientation="horizontal" className="justify-center">
                <Button disabled={!isEmailEntered} className="sign-in-button" variant="outline" onClick={handleGetOTP}>Get OTP</Button>
                <Button className="cursor-pointer" type="submit" onClick={handleSubmit}>Submit</Button>
            </Field>
        </FieldGroup>
    )
}