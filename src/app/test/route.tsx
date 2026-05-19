
export async function GET() {
    // route for testing

    const message:string = "success";
    const status_code:number = 200

    return Response.json({ message, status_code })
}