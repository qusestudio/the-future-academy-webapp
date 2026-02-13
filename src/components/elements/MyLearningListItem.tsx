import React from 'react'
import {Button} from "@/components/ui/button";
import {LayoutDashboardIcon} from 'lucide-react';
import {StudentEnrollment} from "@/types/models";

const MyLearningListItem = ({itemProps, onStart}: { itemProps: StudentEnrollment, onStart: () => void }) => {
    return (
        <div className="w-full items-end hover:cursor-pointer hover:shadow-lg transition-all duration-300 flex gap-x-5 justify-between border-2 p-4 rounded-md">
            <div className="flex gap-x-5 items-center">
                <LayoutDashboardIcon />
                <p className="flex font-medium flex-col">
                    <span>{itemProps.subjectTitle}</span>
                    <span className="text-xs">Grade {itemProps.grade}</span>
                </p>
            </div>
            <Button
                onClick={onStart}
                className="text-xs self-end font-semibold hover:cursor-pointer bg-secondary-450 hover:bg-secondary-600 rounded text-black"
            >
                Start Learning
            </Button>
        </div>
    )
}
export default MyLearningListItem
