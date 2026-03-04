import React from 'react'
import {Button} from "@/components/ui/button";
import {StudentEnrollment} from "@/types/models";
import {HugeiconsIcon} from "@hugeicons/react";
import {BoardMathIcon, CellsIcon, Prism01Icon, TestTube01Icon, ThreeDViewIcon} from "@hugeicons/core-free-icons";

const MyLearningListItem = ({itemProps, onStart}: { itemProps: StudentEnrollment, onStart: () => void }) => {

    let icon;
    switch (itemProps.subjectTitle.toLowerCase()) {
        case "mathematics":
            icon = BoardMathIcon;
            break;
        case "physics":
            icon = Prism01Icon;
            break;
        case "chemistry":
            icon = TestTube01Icon;
            break;
        case "life sciences":
            icon = CellsIcon;
            break;
        default:
            icon = ThreeDViewIcon;
            break;
    }


    return (
        <div className="w-full items-end hover:cursor-pointer hover:shadow-lg transition-all duration-300 flex gap-x-5 justify-between border-2 p-4 rounded-md">
            <div className="flex gap-x-5 items-center">
                <HugeiconsIcon icon={icon} />
                <p className="flex font-medium flex-col">
                    <span>{itemProps.subjectTitle}</span>
                    <span className="text-xs">Grade {itemProps.grade}</span>
                </p>
            </div>
            <Button
                onClick={onStart}
                className="text-xs self-end font-medium hover:cursor-pointer transition-all duration-300 bg-[#4F6357] hover:bg-[#4F6357]/70 rounded-xs text-white"
            >
                Start Learning
            </Button>
        </div>
    )
}
export default MyLearningListItem
