'use client'
import SignIn from "@/app/signIn/page";

export default function Home() {

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-4xl text-emerald-600">Chendol-AI</div>
            
            <div className="w-full max-w-md">
                <SignIn />
            </div>
        </div>
    );
}
