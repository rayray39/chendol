'use client';

import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { SetStateAction, useState } from "react"
import { useRouter } from "next/navigation";


export default function SignIn() {
    const [isEmailEntered, setIsEmailEntered] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');

    const [isEmailEmptyOnSubmit, setIsEmailEmptyOnSubmit] = useState<boolean>(false);
    const [isOtpEmptyOnSubmit, setIsOtpEmptyOnSubmit] = useState<boolean>(false);

    const router = useRouter();

    const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        // handle email input change
        setEmail(event.target.value);
        if (event.target.value.length > 0) {
            setIsEmailEntered(true);
            setIsEmailEmptyOnSubmit(false);
        } else {
            setIsEmailEntered(false);
        }
    }

    const handleOtpChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        // handle otp input change
        setOtp(event.target.value);
        if (event.target.value.length > 0) {
            setIsOtpEmptyOnSubmit(false);
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
            setIsEmailEmptyOnSubmit(true);
            setIsEmailEntered(false);
            return;
        }
        if (!otp) {
            setIsOtpEmptyOnSubmit(true);
            return;
        }
        console.log(`entered email: ${email}`);
        // validate OTP before navigation
        router.push('/home')
        // setEmail('');
        // setOtp('');
    }

    return (
        <FieldGroup>
            <Field data-invalid={isEmailEmptyOnSubmit}>
                <FieldLabel htmlFor="sign-in-email">Email</FieldLabel>
                <Input 
                    id="sign-in-email" 
                    type="text" 
                    placeholder="johndoe@example.com" 
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={isEmailEmptyOnSubmit}
                />
                {
                    isEmailEmptyOnSubmit ? 
                    <FieldDescription>
                        Email cannot be empty.
                    </FieldDescription> :
                    null
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