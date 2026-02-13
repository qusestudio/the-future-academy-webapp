"use client"

import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useGetLessonsQuery, useGetTopicQuery} from "@/state/api";
import {ArrowLeftIcon, Play} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";

const TopicDetails = () => {
    const params = useSearchParams();
    const topicId = params.get("topicId");
    const router = useRouter();

    const {data: topic, isLoading: topicLoading} = useGetTopicQuery(topicId!, {skip: !topicId});
    const {data: lessons, isLoading} = useGetLessonsQuery(topicId!, {skip: !topicId});

    if (isLoading || topicLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    return (
        <div className="relative max-w-300 w-full h-full py-5 gap-y-5 flex flex-col">
            <header className="w-full max-w-7xl flex  items-center gap-x-3">
                <button
                    className="rounded-full border-2 hover:cursor-pointer p-1 border-black"
                    onClick={() => {
                        router.back();
                    }}
                >
                    <ArrowLeftIcon size={20}/>
                </button>
                <p className="font-semibold text-gray-400">
                    {topic?.title}
                </p>
            </header>
            <section className="flex justify-between gap-y-5">
                <h1 className="text-3xl font-bold">
                    Enjoy the lessons! <br />
                    <span className="text-lg font-medium">
                        {
                            lessons?.length === 0 && (<>When they get here.</>)
                        }
                    </span>
                </h1>
            </section>
            <p className="font-semibold text-gray-400">
                {/*{topic?.title}*/}
            </p>
            <Separator orientation={"horizontal"}/>

            <section className="w-full gap-y-2 flex flex-col">
                {lessons?.length === 0 && (
                    <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                        Lessons are on their way.
                    </div>
                )
                }
                {lessons?.map(
                    (lesson, index) => (
                        <div className="w-full flex justify-between items-center border-2 border-black p-2 rounded-sm" key={index}>
                            <p className="text-sm font-medium">
                                <span className="text-muted-foreground font-bold">Lesson #{index+1}</span>: {lesson.title}
                            </p>
                            <Button
                                onClick={() => {
                                    router.push(`/students/mylearning/lesson-details?lessonId=${lesson.id}`);
                                }}
                                className="rounded-xs font-medium hover:cursor-pointer hover:text-black bg-black hover:bg-secondary-600 text-xs"
                            >
                                <Play />
                                Play lesson
                            </Button>
                        </div>
                    )
                )}
            </section>
        </div>
    )
}

export default TopicDetails;