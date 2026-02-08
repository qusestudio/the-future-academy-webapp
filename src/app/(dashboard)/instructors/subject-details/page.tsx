"use client"

import React, {Suspense} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useGetSubjectQuery, useGetTopicsBySubjectQuery} from "@/state/api";
import {ArrowLeftIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {List, TopicListItem} from "@/components/elements/List";

const SubjectDetails = () => {
    const router = useRouter();
    const params = useSearchParams();
    const subjectId = params.get("id");
    const {data: subject, isLoading} = useGetSubjectQuery(subjectId || "", {skip: !subjectId});
    const {data: topics, isLoading: topicsLoading} = useGetTopicsBySubjectQuery(subjectId || "", {skip: !subjectId});

    if (isLoading || topicsLoading) {
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
                    <p className="text-primary-400 text-xl font-medium uppercase">{subject?.id}</p>
                    <p>Grade {subject?.grade}</p>
                </div>
                <div className="w-full font-medium flex justify-between">
                    <p className="text-black">{subject?.title}</p>
                    <p>Term {subject?.term}</p>
                </div>
            </section>
            <section className="w-full flex flex-col gap-y-5 items-center max-w-7xl">
                {/*    Add topics button below*/}
                <Button
                    variant={"outline"}
                    className="border-black hover:cursor-pointer border-2 rounded-full"
                    onClick={() => {
                        router.push(`/instructors/subject-details/new-topic?subjectId=`+subjectId);
                    }}
                >
                    Add topic
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
                            topics?.length == 0 && (
                                <div className="w-full items-center h-full gap-y-5 flex flex-col">
                                    <p className="text-muted-foreground font-medium tracking-wide">No topics available yet.</p>
                                </div>
                            )
                        }
                        {
                            topics?.map((topic, index: number) =>
                                <TopicListItem key={index} topic={topic}
                                                 onView={() => router.push("/instructors/topics-details" + "?id=" + topic.id)}/>
                            )
                        }
                    </Suspense>
                </List>
            </section>
        </div>
    );
};

export default SubjectDetails;