"use client"

import React from 'react';
import {CreateTopicForm} from "@/components/elements/forms/SubjectForm";
import {useRouter, useSearchParams} from "next/navigation";
import {ArrowLeftIcon} from "lucide-react";
import {useCreateTopicMutation} from "@/state/api";
import {Topic} from "@/types/models";
import {TopicFormData} from "@/lib/schemas";

const NewTopic = () => {
    const router = useRouter();
    const params = useSearchParams();
    const [createTopic] = useCreateTopicMutation();

    const subjectId = params.get("subjectId");

    // short circuit

    const handleSubmit = async (data: TopicFormData) => {
        const topic: Topic = {
            subjectId: subjectId!,
            title: data.title
        }
        await createTopic({topic})
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
            <CreateTopicForm onSubmit={handleSubmit} />
        </div>
    );
};

export default NewTopic;