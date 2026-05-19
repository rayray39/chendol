
// true if url contains https header, false otherwise
const githubUrlContainsHttps = (url:string) => {
    return url.includes("https://")
}

// true if url contains valid github.com domain, false otherwise
const githubUrlContainsValidDomain = (url:string) => {
    return url.includes("github.com")
}

// true if username adheres to github's policy
// between 1 to 39 chars long 
// does not start nor end with "-"
// alphanumeric and no consecutive "-"
const githubUsernameIsValid = (url:string) => {
    const splitUrl = url.split("/")
    const username = splitUrl[splitUrl.length - 2]

    const usernameInCharLimits = username.length <= 39 && username.length >= 1
    const usernameDoesNotStartOrEndWithHyphens = username[0] !== "-" && username[username.length - 1] !== "-"

    const regex = /^(?!.*--)[A-Za-z0-9-]+$/;
    const usernameIsAlphanumericAndNoConsecutiveHyphens = regex.test(username)

    return (usernameInCharLimits && usernameDoesNotStartOrEndWithHyphens && usernameIsAlphanumericAndNoConsecutiveHyphens)
}

// true if repo name is short and concise (less than 30 words), false otherwise
const githubRepoNameIsValid = (url:string) => {
    const splitUrl = url.split("/")
    const repoName = splitUrl[splitUrl.length - 1]
    if (repoName.length > 30) {
        // repo name is unusually long, highly suspicious
        return false
    }
    return true
}

const isTypoglycemiaMatch = (word: string, target: string): boolean => {
    // must be same length, same first and last characters
    if (word.length !== target.length) return false
    if (word[0] !== target[0]) return false
    if (word[word.length - 1] !== target[target.length - 1]) return false

    // middle characters must be a permutation of each other
    // take the middle words, split it, sort the letters in order, join them back
    const wordMiddle = word.slice(1, -1).split('').sort().join('')
    const targetMiddle = target.slice(1, -1).split('').sort().join('')
    return wordMiddle === targetMiddle
}

// true if contains malicious attempt at prompt injection, false otherwise
const maliciousPromptDetected = (url:string) => {
    // eg. url === https://github.com/username/repo_name

    // list of malicious words that could be contained in url
    const maliciousWords = ['ignore', 'bypass', 'override', 'reveal', 'delete', 'system']

    // check for presence of exact malicious word
    for (let i = 0; i < maliciousWords.length; i++) {
        if (url.includes(maliciousWords[i])) {
            return true
        }
    }
    const split_url_by_slash = url.split("/")
    for (let i = 0; i < maliciousWords.length; i++) {
        for (let j = 0; j < split_url_by_slash.length; j++) {
            if (maliciousWords[i] === split_url_by_slash[j]) {
                return true
            }
        }
    }

    // check for typoglycemia words, from list of malicious words, using fuzzy string matching
    // eg. inorge, bpayss, oriderve, rveeal, dlteee, semtys
    // where the first and last letter are in order only

    // extract individual words from url by splitting on common url delimiters
    const urlWords = url.split(/[/._\-]+/)
    for (let i = 0; i < urlWords.length; i++) {
        for (let j = 0; j < maliciousWords.length; j++) {
            if (isTypoglycemiaMatch(urlWords[i], maliciousWords[j])) {
                return true
            }
        }
    }
}


export default function isSuspiciousGithubUrl(url:string) {
    // https://github.com/username/repo_name
    if (url.split("/").length > 5) {
        return true
    }

    if (maliciousPromptDetected(url)) {
        return true
    }

    if (!githubUrlContainsHttps(url) || !githubUrlContainsValidDomain(url)) {
        // does not even contain https:// or valid github.com domain
        return true
    } else {
        return (!githubUsernameIsValid(url) || !githubRepoNameIsValid(url))
    }
} 