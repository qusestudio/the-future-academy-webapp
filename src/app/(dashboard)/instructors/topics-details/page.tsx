"use client"

import React, {Suspense} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useGetLessonsQuery, useGetTopicQuery} from "@/state/api";
import {ArrowLeftIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {LessonListItem, List} from "@/components/elements/List";

const TopicDetails = () => {
    const router = useRouter();
    const params = useSearchParams();
    const topicId = params.get("id");
    const {data: topic, isLoading} = useGetTopicQuery(topicId || "", {skip: !topicId});
    const {data: lessons, isLoading: lessonsLoading} = useGetLessonsQuery(topicId || "", {skip: !topicId});

    if (isLoading || lessonsLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    return (
        <div
            className="relative  overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full items-center h-full gap-y-5 flex flex-col">
            <header className="w-full max-w-7xl flex justify-between">
                <button
                    className="rounded-full border-2 hover:cursor-pointer p-1 border-black"
                    onClick={() => {
                        router.back()
                    }}
                >
                    <ArrowLeftIcon size={20}/>
                </button>
            </header>
            <section className="w-full max-w-7xl">
                <div className="w-full font-medium flex justify-between">
                    <p className="text-black">{topic?.title}</p>
                </div>
            </section>
            <section className="w-full flex flex-col gap-y-5 items-center max-w-7xl">
                {/*    Add topics button below*/}
                <Button
                    variant={"outline"}
                    className="border-black hover:cursor-pointer border-2 rounded-full"
                    onClick={() => {
                        router.push(`/instructors/topics-details/new-lesson?topicId=` + topicId);
                    }}
                >
                    Add Lesson
                </Button>
                <List>
                    <Suspense
                        fallback={
                            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                                <p className="text-lg font-medium">Loading...</p>
                            </div>
                        }
                    >
                        {
                            lessons?.length == 0 && (
                                <div className="w-full items-center h-full gap-y-5 flex flex-col">
                                    <p className="text-muted-foreground font-medium tracking-wide">No lessons available
                                        yet.</p>
                                </div>
                            )
                        }
                        {
                            lessons?.map((lesson, index: number) =>
                                <LessonListItem key={index} lesson={lesson}
                                                onView={() => router.push("/instructors/lesson-details" + "?id=" + lesson.id)}/>
                            )
                        }
                    </Suspense>
                </List>
            </section>
        </div>
    );
};

export default TopicDetails;