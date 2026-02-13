"use client"

import React from 'react'
import MyLearningListItem from "@/components/elements/MyLearningListItem";
import {Separator} from "@/components/ui/separator";
import {useGetAuthUserQuery, useGetStudentEnrollmentsQuery} from "@/state/api";
import {usePathname, useRouter} from "next/navigation";

const StudentMyLearning = () => {

    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const {data: enrollments, isLoading: enrollmentsLoading} = useGetStudentEnrollmentsQuery(
        authUser!.cognitoInfo.userId!,
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
                <h1 className="lg:text-2xl text-xl capitalize font-bold">
                    Hey <span className="text-yellow-400 font-bold">{authUser?.userInfo?.name}</span>! <br/> What
                    are we doing today?
                </h1>
                <p className="text-sm sm:text-right font-medium text-[#555]">
                    DID YOU KNOW? <br/>
                    <span className="font-semibold">
                        If you don&apos;t study it can be really hard to pass.
                    </span>
                </p>

            </section>
            <p className="font-semibold text-gray-400">
                GRADE TEN
            </p>
            <Separator orientation={"horizontal"}/>

            <section className="w-full gap-y-2 flex flex-col">
                {enrollments?.length === 0 && (
                    <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">

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
