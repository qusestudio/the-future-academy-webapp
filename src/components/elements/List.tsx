import React from 'react';
import {Lesson, Subject, Topic} from "@/types/models";
import {Button} from "@/components/ui/button";
import {Dot, PlayIcon} from "lucide-react";

function SubjectListItem({subject, onView}: {subject: Subject, onView?: () => void}) {
    return (
        <div className="w-full border-2 hover:bg-yellow-200 border-black  items-center justify-between rounded-xl p-2 px-3 flex">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                    {subject.title}
                </p>
                <p className="text-sm flex items-center font-medium text-gray-500">
                    Grade {subject.grade} <Dot /> <span className="text-sm uppercase">{subject.id}</span>
                </p>
            </div>
            <Button className="rounded max-md:text-xs hover:cursor-pointer" onClick={onView}>
                View
            </Button>
        </div>
    );
}

function TopicListItem({topic, onView}: {topic: Topic, onView?: () => void}) {
    return (
        <div className="w-full flex border-2 hover:bg-yellow-200 rounded-xl hover:cursor-pointer border-black  items-center p-2 px-3 justify-between">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                    {topic.title}
                </p>
            </div>
            <Button className="rounded max-md:text-xs hover:cursor-pointer" onClick={onView}>
                View
            </Button>
        </div>
    )
}

function LessonListItem({lesson, onView}: {lesson: Lesson, onView?: () => void}) {
    return (
        <div className="w-full flex border-2 hover:bg-yellow-200 rounded-xl hover:cursor-pointer border-black  items-center p-2 px-3 justify-between">

            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                    {lesson.title}
                </p>
            </div>
            <Button className="rounded max-md:text-xs hover:cursor-pointer" onClick={onView}>
                <PlayIcon /> View lesson
            </Button>
        </div>
    );
}


function List({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full flex flex-col gap-5 items-stretch">
            {children}
        </div>
    );
}

export {
    List,
    SubjectListItem,
    TopicListItem,
    LessonListItem
}