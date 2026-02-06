import React from 'react';
import {Subject} from "@/types/models";
import {Button} from "@/components/ui/button";
import {Dot} from "lucide-react";

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


function SubjectList( {children}: {children: React.ReactNode}) {
    return (
        <div className="w-full flex flex-col gap-5 items-stretch">
            {children}
        </div>
    );
}

export {
    SubjectList,
    SubjectListItem
}