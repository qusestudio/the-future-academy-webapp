"use client"

import React, {ChangeEvent, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {
    useCreateLessonMutation,
    useGetSignedUrlMutation,
    useUploadVideoToS3Mutation
} from "@/state/api";
import {LessonFormData} from "@/lib/schemas";
import {Lesson} from "@/types/models";
import {ArrowLeftIcon} from "lucide-react";
import {CreateLessonForm} from "@/components/elements/forms/SubjectForm";


const NewLesson = () => {
    const router = useRouter();
    const params = useSearchParams();
    const topicId = params.get("topicId");
    const [fileFound, setFileFounded] = React.useState(false);
    const [status, setStatus] = useState<string>("");
    const [videoS3Key, setVideoS3Key] = React.useState<string>("");
    const [uploaded, setUploaded] = React.useState(false);

    // RTK Hooks
    const [createLesson] = useCreateLessonMutation();
    const [getSignedUrl] = useGetSignedUrlMutation();
    const [uploadVideoToS3] = useUploadVideoToS3Mutation();

    // 1. Handle Video Upload
    const handleFileChange = async (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileFounded(true);

        if (!file.type.startsWith("video/")) {
            setStatus("Please select a valid video file.");
            return;
        }

        try {
            // 1.1 Get Signed URL
            const {uploadUrl, fileKey} = await getSignedUrl({
                fileName: file.name,
                fileType: file.type,
            }).unwrap();

            setStatus("Uploading video...!");


            // 1.2 Upload to S3
            await uploadVideoToS3({ uploadUrl, file }).unwrap();

            setVideoS3Key(fileKey);
            setUploaded(true);
            setStatus("Upload Complete!");
        } catch (err) {
            console.error(err);
            setStatus("Error during upload.");
        }
    }

    const initialData: LessonFormData = {
        // topicId: topicId!,
        // videoId: "",
        title: "",
        description: "",
    }

    const handleSubmit = async (data: LessonFormData) => {

        if(!uploaded || !fileFound) return;
        alert("Creating Lesson")
        const lesson: Omit<Lesson, "id"> = {
            topicId: topicId!,
            videoId: videoS3Key,
            title: data.title,
            description: data.description,
        }

        await createLesson(lesson);
    }

    return (
        <div className="flex items-center  flex-col">
            <button
                className="p-1 self-start rounded-full border-2 border-black"
                onClick={() => {
                    router.back()
                }}
            >
                <ArrowLeftIcon size={20}/>
            </button>
            {/* Upload Video Here*/}
            <div className="mb-5">
                <p className=" text-black mt-1">
                    Create new lesson
                </p>
            </div>
            <div className="p-8">
                <h1 className="text-xl font-medium mb-4">Upload Lesson Video</h1>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="flex flex-col w-full px-2 text-sm text-gray-500 border rounded-lg cursor-pointer"
                />
                <p className="mt-4 font-medium text-muted-foreground">{status}</p>
            </div>
            {/*  Create Lesson Form Data  */}
            <CreateLessonForm onSubmit={handleSubmit} initialData={initialData}/>
        </div>
    );
};

export default NewLesson;