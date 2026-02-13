"use client"

import React from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useGetSubjectQuery, useGetTopicsBySubjectQuery} from "@/state/api";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon} from "lucide-react";

const SubjectDetails = () => {
    const params = useSearchParams();
    const subjectId = params.get("subjectId");
    const router = useRouter();


    const {data: subject, isLoading: subjectLoading} = useGetSubjectQuery(subjectId!, {skip: !subjectId});
    const {data: topics, isLoading} = useGetTopicsBySubjectQuery(subjectId!, {skip: !subjectId});

    if (isLoading || subjectLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }



    return (
        <div className="relative max-w-300 w-full h-full py-5 gap-y-5 flex flex-col">
            <header className="w-full max-w-7xl flex items-center gap-x-5">
                <button
                    className="rounded-full border-2 hover:cursor-pointer p-1 border-black"
                    onClick={() => {
                        router.back()
                    }}
                >
                    <ArrowLeftIcon size={20}/>
                </button>
                <p className="font-semibold text-gray-400">
                    {subject?.title}
                </p>
            </header>
            <section className="flex justify-between gap-y-5">
                <h1 className="text-3xl max-sm:text-2xl  font-bold">
                    Explore these topics to understand more of the subject.
                </h1>
            </section>

            <section className="w-full mt-10 gap-y-2 flex flex-col">
                {topics?.length === 0 && (
                    <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                    </div>
                )
                }
                {topics?.map(
                    (topic, index) => (
                        <div className="w-full flex justify-between items-center border-2 p-2 rounded-sm" key={index}>
                            <div className="text-sm flex items-center gap-x-2 font-medium">
                                <p className="bg-black h-8 w-8 text-yellow-500 flex justify-center items-center text-center p-2 rounded-full">{index + 1}</p>
                                {topic.title}
                            </div>
                            <Button
                                onClick={()=>{
                                    router.push(`/students/mylearning/topic-details?topicId=${topic.id}`);
                                }}
                                className="rounded-xs font-medium hover:cursor-pointer text-black bg-secondary-450 hover:bg-secondary-600 text-xs">
                                View
                            </Button>
                        </div>
                    )
                )}
            </section>
        </div>
    )
}

export default SubjectDetails;