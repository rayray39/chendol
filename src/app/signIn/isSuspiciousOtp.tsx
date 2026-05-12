
// true if otp contains only numbers, false otherwise
const otpContainsNumbersOnly = (otp:string) => {
    const onlyNumbers:boolean = /^\d+$/.test(otp);
    if (!onlyNumbers) {
        console.log('otp contains letters')
    }
    return onlyNumbers
}

// true if otp contains whitespaces
const otpContainsWhitespaces = (otp:string) => {
    for (let i = 0; i < otp.length; i++) {
        if (otp[i] === " ") {
            console.log('otp contains whitespaces')
            return true
        }
    }
    return false
}

// true if otp contains only 6 digits
const otpContainsSixDigits = (otp:string) => {
    if (!(otp.length === 6)) {
        console.log('otp not 6 digits')
    }
    return otp.length === 6;
}

export default function isSuspiciousOtp(otp:string) {
    if (
        !otpContainsNumbersOnly(otp) ||
        otpContainsWhitespaces(otp) ||
        !otpContainsSixDigits(otp)
    ) {
        return true
    }
    return false
} 