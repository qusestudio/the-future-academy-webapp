"use client"

import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useGetLessonQuery} from "@/state/api";
import {ArrowLeftIcon} from "lucide-react";
import VideoPlayer from "@/components/elements/VideoPlayer";
import {CLOUDFRONT} from "@/lib/constants";

const LessonDetails = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const lessonId = searchParams.get("lessonId");

    const {data: lesson, isLoading: lessonLoading} = useGetLessonQuery(lessonId!);

    if (lessonLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    return (
        <div
            className="relative py-5 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full items-center h-full gap-y-5 flex flex-col">
            <header className="w-full max-w-7xl flex items-center gap-x-5">
                <button
                    className="rounded-full border-2 hover:cursor-pointer p-1 border-black"
                    onClick={() => {
                        router.back()
                    }}
                >
                    <ArrowLeftIcon size={20}/>
                </button>
                <p className="text-black font-medium lg:text-lg md:text-sm">{lesson?.title}</p>
            </header>
            {/*    */}
            <section className="w-full relative hover:cursor-pointer  max-w-7xl">
                <VideoPlayer src={`${CLOUDFRONT}/${lesson?.videoId}`} />
            </section>

            <section className="w-full relative max-w-7xl">
                <p className={"text-lg font-medium text-muted-foreground"}>Description:</p>
                <div className="w-full font-medium flex justify-between">
                    <p className="text-black ">{lesson?.description}</p>
                </div>
            </section>

        </div>
    );
};

export default LessonDetails;