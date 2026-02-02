"use client"

import React from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";

const StudentMyLearning = () => {

    // use subject

    return (
        <div className="relative w-full h-full  flex flex-col">
            <div className="w-full hover:cursor-pointer hover:shadow-2xl transition-all duration-300 flex gap-x-5 justify-between border p-4 rounded-md">
                <div className="flex gap-x-5">
                    <Image
                        src={"/maths.svg"}
                        alt={"Maths Icon"}
                        width={40}
                        height={30}
                        className="object-cover"
                    />
                    <p className="flex flex-col">
                        <span>Mathematics</span>
                        <span className="text-xs">12 Concepts</span>
                    </p>
                </div>
                <Button className="text-xs self-end bg-secondary-450 hover:bg-secondary-450/40 rounded text-black">
                    Continue
                </Button>
            </div>
                <div className="bg-red-500/50 aspect-video rounded-xl" />
                <div className="bg-black/50 aspect-video rounded-xl" />
                <div className="bg-blue-500/50 aspect-video rounded-xl" />
        </div>
    )
}
export default StudentMyLearning
