"use client"

import React from 'react'
import {
    useCreateEnrollmentMutation,
    useGetAuthUserQuery,
    useGetNonEnrollmentsQuery,
    useGetProfileQuery
} from "@/state/api";
import {EnrollmentListItem} from "@/components/elements/List";
import {formatGrade} from "@/lib/utils";

const StudentEnrollments = () => {

    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const {data: profile, isLoading: profileLoading} = useGetProfileQuery(
        authUser?.cognitoInfo.userId || "",
        {skip: !authUser?.cognitoInfo.userId}
    );
    const {data: subjects, isLoading} = useGetNonEnrollmentsQuery( {studentId: authUser!.cognitoInfo.userId, grade: profile!.grade! }, {skip: !authUser});
    const [createEnrollment] = useCreateEnrollmentMutation();

    const grade: number = 10;
    let grade_text = "";
    switch (grade) {
        case 10:
            grade_text = "TEN"
            break;
        case 11:
            grade_text = "ELEVEN"
            break;
        case 12:
            grade_text = "TWELVE"
            break;
        default:
            break;
    }

    if (isLoading || authLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    const handleEnroll = async (enrollment: {studentId: string, subjectId: string, }) => {
        alert("Enrolling")
        await createEnrollment(enrollment);
    }

    return (
        <div className="relative overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full max-w-300 h-full py-5 gap-y-5 flex flex-col">
            <section className="flex flex-col gap-y-5">
                <h1 className="text-3xl font-bold"><span className="text-yellow-400 font-semibold">Your</span> Journey Starts Here.</h1>
                <p className="text-sm font-medium text-[#555]">
                    Explore the subjects available. <br /> These are the
                    CAPS-aligned subjects that will help you prepare for your exams and your future.
                </p>
                <p className="font-semibold text-gray-400">
                    GRADE {formatGrade(profile!.grade)}
                </p>
            </section>
            <section className="flex  flex-col gap-y-2">
                {
                    subjects?.map((subject, index) => (
                        <EnrollmentListItem key={index}
                                            onEnroll={()=>{
                                                handleEnroll({ subjectId: subject.subjectId,
                            studentId: authUser!.cognitoInfo!.userId
                        }).then()}}
                                            subject={subject} />
                    ))
                }
            </section>

        </div>
    )
}
export default StudentEnrollments
