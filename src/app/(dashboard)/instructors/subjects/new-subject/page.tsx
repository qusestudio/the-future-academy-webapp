"use client"

import React from 'react';
import {CreateSubjectForm} from "@/components/elements/forms/SubjectForm";
import {useRouter} from "next/navigation";
import {ArrowLeftIcon} from "lucide-react";
import {useCreateSubjectMutation, useGetAuthUserQuery} from "@/state/api";
import {Subject} from "@/types/models";

const NewSubject = () => {
    const router = useRouter();
    const {data: authUser, isLoading} = useGetAuthUserQuery();
    const [createSubject] = useCreateSubjectMutation();

    const handleSubmit = async (data: CreateSubjectFormProps) => {

        const subject: Subject = {
            instructorId: authUser?.cognitoInfo.userId || "",
            title: data.title,
            grade: data.grade,
            term: data.term
        }

        await createSubject({subject});
    }

    return (
        <div className="flex items-center  flex-col">
            <button
                className="p-1 self-start rounded-full border-2 border-black"
                onClick={()=>{
                    router.back()
                }}
            >
                <ArrowLeftIcon size={20} />
            </button>
            <CreateSubjectForm onSubmit={handleSubmit} />
        </div>
    );
};

export default NewSubject;