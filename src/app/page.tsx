'use client'
import { Button } from "@/components/ui/button"

export default function Home() {

    const buttonHandler = () => {
        console.log('button  clicked');
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-3xl">Chendol-AI</div>
            <div>Hello World</div>

            <Button onClick={buttonHandler}>click me</Button>
        </div>
    );
}
