"use client"

import React from 'react'
import {usePathname} from "next/navigation";
import {TopicListSidebar, TopicListSidebarItem} from "@/components/elements/TopicListSidebar";
import ReactPlayer from 'react-player';

const topics: TopicListSidebarItemProps[] = [
    {
        id: "1",
        name: "Exponents"
    },
    {
        id: "2",
        name: "Number Patterns"
    },
    {
        id: "3",
        name: "Trigonometry"
    },
    {
        id: "4",
        name: "Analytical Geometry"
    },
    {
        id: "5",
        name: "Euclidean Geometry"
    }
];

const SubjectPage = () => {
    const pathname = usePathname();
    const subjectId = pathname.split("/").pop();

    if(subjectId) {
        // call the useSubject hook
        // call useTopics here or something
    }

    const video = 'https://www.youtube.com/watch?v=LXb3EKWsInQ';

    return (
        <div className="w-full grid grid-cols-[20%_80%] pr-5 gap-x-5 h-full">
            <TopicListSidebar>
                {
                    topics.map((item, index)=>(
                        <TopicListSidebarItem sidebarItemProps={item} key={index}/>
                    ))
                }
            </TopicListSidebar>
            <div className="w-full flex justify-stretch">
                <div className="relative aspect-video w-full">
                    {/* Custom Header/Branding Overlay */}
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-2">
                            <img src="/your-logo.png" alt="LMS Logo" className="h-8" />
                            <span className="text-white font-semibold">Your LMS Name</span>
                        </div>
                    </div>

                    {/* YouTube iframe with minimal branding */}
                    <iframe
                        src="https://www.youtube.com/embed/LXb3EKWsInQ?modestbranding=0&rel=0&showinfo=0&controls=0&fs=1&cc_load_policy=1&color=white&playsinline=1"
                        title="Lesson Video"
                        allowFullScreen
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full rounded-xl h-[70vh]"
                    />

                    {/* Custom Control Bar */}
                    <div className="mt-4 flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Previous Lesson
                        </button>
                        <span className="text-gray-700 font-medium">Trigonometry - Lesson 1</span>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Next Lesson
                        </button>
                    </div>
                </div>
            </div>
            {/*<div className="w-full h-full">*/}
            {/*    <p>Lesson Outline</p>*/}
            {/*</div>*/}
        </div>
    )
}
export default SubjectPage
