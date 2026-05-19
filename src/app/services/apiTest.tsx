
export async function Test() {
    const response = await fetch('/test', {
        method: "GET"
    })

    const data = await response.json()
    return {
        "message": data.message,
        "status_code": data.status_code
    }
}