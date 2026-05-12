
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


export default function isSuspiciousGithubUrl(url:string) {
    if (!githubUrlContainsHttps(url) || !githubUrlContainsValidDomain(url)) {
        // does not even contain https:// or valid github.com domain
        return true
    } else {
        return (!githubUsernameIsValid(url) || !githubRepoNameIsValid(url))
    }
} 