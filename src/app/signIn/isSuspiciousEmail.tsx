
// true if email contains other texts, false otherwise
const emailContainsOtherTexts = (email:string) => {
    if (email.split(" ").length > 1) {
        // eg. 'dragonhunter@gmail.com random_text other_random_text' 
        return true;
    }
    return false
}

// true if email contains more than 1/no @ symbols, false otherwise
const emailDoesNotContainSingleAtSign = (email:string) => {
    let numberOfAtSigns = 0
    for (let i = 0; i < email.length; i++) {
        if (email[i] === "@") {
            numberOfAtSigns++
        }
    }
    return numberOfAtSigns !== 1
}

// true if username is too long (>64 chars) or empty, false otherwise
const emailContainsSuspiciousUsername = (email:string) => {
    // perform checks on username
    const userEmailUsername = email.split("@")[0]   // dragonhunter
    if (userEmailUsername.length > 64 || userEmailUsername.length == 0) {
        // email username is too long or empty
        return true;
    }
    return false;
}

// true if domain is not common
const emailContainsSuspicousDomain = (email:string) => {
    // perform checks on domain
    const userEmailDomain = email.split("@")[1]     // gmail.com
    const commonEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
    if (!commonEmailDomains.includes(userEmailDomain)) {
        return true
    }
    return false;
}

export default function isSuspiciousEmail(email:string) {
    const trimmed_email = email.trim();
    if (
        emailContainsOtherTexts(trimmed_email) ||
        emailDoesNotContainSingleAtSign(trimmed_email) ||
        emailContainsSuspiciousUsername(trimmed_email) ||
        emailContainsSuspicousDomain(trimmed_email)
    ) {
        return true;
    }
    return false
}