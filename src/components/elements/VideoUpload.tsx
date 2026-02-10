"use client";
import React, { useState, ChangeEvent } from "react";

export default function VideoUpload() {
    const [status, setStatus] = useState<string>("");

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic Validation
        if (!file.type.startsWith("video/")) {
            setStatus("Please select a valid video file.");
            return;
        }

        try {
            setStatus("Requesting secure upload link...");

            // 1. Get the Signed URL from our API
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileName: file.name, fileType: file.type }),
            });

            const { uploadUrl, fileKey } = await res.json();

            setStatus("Uploading directly to Cape Town...");

            // 2. Upload to S3 using the PUT method
            const upload = await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: { "Content-Type": file.type },
            });

            if (upload.ok) {
                setStatus("Upload Complete!");
                console.log("Your file is stored at:", fileKey);
            } else {
                throw new Error("S3 Upload Failed");
            }
        } catch (err) {
            console.error(err);
            setStatus("Error during upload.");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Upload Lesson Video</h1>
            <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="flex w-full px-2 text-sm text-gray-500 border rounded-lg cursor-pointer"
            />
            <p className="mt-4 font-medium text-blue-600">{status}</p>
        </div>
    );
}