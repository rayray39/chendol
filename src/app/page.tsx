'use client'
import SignIn from "@/signIn/page";

export default function Home() {

    const buttonHandler = () => {
        console.log('button  clicked');
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-3xl">Chendol-AI</div>
            
            <div className="w-full max-w-md">
                <SignIn />
            </div>
        </div>
    );
}
