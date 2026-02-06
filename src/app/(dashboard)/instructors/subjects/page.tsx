"use client"

import React, {Suspense} from 'react'
import {useGetAuthUserQuery, useGetSubjectsForInstructorQuery} from "@/state/api";
import {SubjectList, SubjectListItem} from "@/components/elements/SubjectList";
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
        router.push(pathname + "/new");
    }

    if (authLoading || subjectLoading) {
        return <>Loading...</>
    }

    if(subjects) {
        return (
            <div className="relative w-full items-center h-full gap-y-5 flex flex-col">
                <header className="w-full max-w-7xl flex justify-between">
                    <p className="font-medium">Subjects</p>
                    <button
                        className="rounded-full border-2 hover:cursor-pointer p-1 border-black"
                        onClick={handleAddSubject}
                    >
                        <Plus size={20} />
                    </button>
                </header>
                <section className="w-full max-w-7xl">
                    <SubjectList>
                        <Suspense fallback={<div>Loading...</div>}>
                            {
                                subjects?.map((subject: Subject, index: number) =>
                                    <SubjectListItem key={index} subject={subject} />
                                )
                            }
                        </Suspense>
                    </SubjectList>
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
