"use client"

import React from 'react';
import {usePathname, useRouter} from "next/navigation";
import {useGetSubjectQuery} from "@/state/api";
import {ArrowLeftIcon, Plus} from "lucide-react";

const SubjectDetails = () => {
    const router = useRouter();
    const pathname = usePathname();
    const subjectId = pathname.split("/").pop();
    const {data: subject, isLoading } = useGetSubjectQuery(subjectId || "", {skip: !subjectId});

    if (isLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    return (
        <div className="relative  overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full items-center h-full gap-y-5 flex flex-col">
            <header className="w-full max-w-7xl flex justify-between">
                <button
                    className="rounded-full border-2 hover:cursor-pointer p-1 border-black"
                    onClick={()=>{router.back()}}
                >
                    <ArrowLeftIcon size={20} />
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
        </div>
    );
};

export default SubjectDetails;