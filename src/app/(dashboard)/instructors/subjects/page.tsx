"use client"

import React, {Suspense} from 'react'
import {useGetAuthUserQuery, useGetSubjectsForInstructorQuery} from "@/state/api";
import {List, SubjectListItem} from "@/components/elements/List";
import {Subject} from "@/types/models";
import {Plus} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

const InstructorSubjects = () => {
    const pathname = usePathname();
    const router = useRouter();

    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const {data: subjects, isLoading: subjectLoading} = useGetSubjectsForInstructorQuery(
        authUser?.cognitoInfo?.userId ?? "",
        {
            skip: !authUser?.cognitoInfo?.userId  // Skip query if no userId
        }
    );

    const handleAddSubject = () => {
        router.push(pathname + "/new-subject");
    }

    if (authLoading || subjectLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    if (subjects) {
        return (
            <div
                className="relative  overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full items-center h-full gap-y-5 flex flex-col">
                <header className="w-full max-w-7xl flex justify-between">
                    <p className="font-medium">Subjects</p>
                    <button
                        className="rounded-full border-2 hover:cursor-pointer p-1 border-black"
                        onClick={handleAddSubject}
                    >
                        <Plus size={20}/>
                    </button>
                </header>
                <section className="w-full max-w-7xl">
                    <List>
                        <Suspense
                            fallback={
                                <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                                    <p className="text-lg font-medium">Loading...</p>
                                </div>
                            }
                        >
                            {
                                subjects?.map((subject: Subject, index: number) =>
                                    <SubjectListItem key={index} subject={subject}
                                                     onView={() => router.push("/instructors/subject-details" + "?id=" + subject.id)}/>
                                )
                            }
                        </Suspense>
                    </List>
                </section>
                {/*  ===================================================  */}
                <section className="w-full max-w-7xl">
                    {/*<p>Resources</p>*/}
                </section>
            </div>
        )
    }
}
export default InstructorSubjects
