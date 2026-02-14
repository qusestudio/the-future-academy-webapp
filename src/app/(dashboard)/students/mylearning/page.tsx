"use client"

import React from 'react'
import MyLearningListItem from "@/components/elements/MyLearningListItem";
import {Separator} from "@/components/ui/separator";
import {useGetAuthUserQuery, useGetProfileQuery, useGetStudentEnrollmentsQuery} from "@/state/api";
import {usePathname, useRouter} from "next/navigation";
import {formatGrade} from "@/lib/utils";
import Link from "next/link";
import {ArrowLeft, ArrowRight} from "lucide-react";

const StudentMyLearning = () => {
    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const {data: enrollments, isLoading: enrollmentsLoading} = useGetStudentEnrollmentsQuery(
        authUser!.cognitoInfo.userId!,
        {skip: !authUser?.cognitoInfo.userId}
    );
    const {data: profile, isLoading: profileLoading} = useGetProfileQuery(
        authUser?.cognitoInfo.userId || "",
        {skip: !authUser?.cognitoInfo.userId}
    );


    const pathname = usePathname();
    const router = useRouter();


    if (authLoading || enrollmentsLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    return (
        <div className="relative max-w-300 w-full h-full py-5 gap-y-5 flex flex-col">
            <section className="flex max-sm:flex-col justify-between gap-y-5">
                <h1 className="lg:text-3xl text-xl capitalize font-bold">
                    Hey <span className="text-yellow-400 font-bold">{authUser?.userInfo?.name}</span>! <br/>
                    <p className="text-black">
                        What
                        are we doing today?
                    </p>
                </h1>
                {/*<p className="text-sm sm:text-right font-medium text-[#555]">*/}
                {/*    DID YOU KNOW? <br/>*/}
                {/*    <span className="font-semibold">*/}
                {/*        If you don&apos;t study it can be really hard to pass.*/}
                {/*    </span>*/}
                {/*</p>*/}

            </section>

            <Separator orientation={"horizontal"}/>

            <section className="w-full gap-y-2 flex flex-col">
                {enrollments?.length === 0 && (
                    <div className="w-full items-center justify-center h-[70vh] gap-y-5 flex flex-col">
                        <p className="font-bold text-center text-muted-foreground">
                            Tadaaa! <br />You are not enrolled to any subject yet.
                            Go to enrollments page and get started
                        </p>
                        <Link href={"/students/enrollments"} className="text-blue-600 flex items-center gap-x-2 underline">Enrollments <ArrowRight size={20} /> </Link>
                    </div>)
                }
                {enrollments?.map(
                    (item, index) => (
                        <MyLearningListItem
                            itemProps={item}
                            onStart={() => {
                                router.push(`${pathname}/subject-details?subjectId=${item.subjectId}`);
                            }}
                            key={index}
                        />
                    )
                )}
            </section>
        </div>
    )
}
export default StudentMyLearning
