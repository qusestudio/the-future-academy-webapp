"use client"

import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useCreateTopicMutation} from "@/state/api";
import {TopicFormData} from "@/lib/schemas";
import {Lesson, Topic} from "@/types/models";
import {ArrowLeftIcon} from "lucide-react";
import {CreateTopicForm} from "@/components/elements/forms/SubjectForm";
import VideoUpload from "@/components/elements/VideoUpload";

const NewLesson = () => {
    const router = useRouter();
    const params = useSearchParams();
    // const [createTopic] = useCreateTopicMutation();

    const topicId = params.get("topicId");

    // short circuit

    const handleSubmit = async (data: Lesson) => {
        // const topic: Topic = {
        //     subjectId: subjectId!,
        //     title: data.title
        // }
        // await createTopic({topic})
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
            {/*<CreateTopicForm onSubmit={handleSubmit} />*/}
            <VideoUpload />
        </div>
    );
};

export default NewLesson;