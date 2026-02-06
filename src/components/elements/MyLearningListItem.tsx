import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {LayoutDashboardIcon} from 'lucide-react';

const MyLearningListItem = ({itemProps}: { itemProps: MyLearningListItemProps }) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className="w-full items-end hover:cursor-pointer hover:shadow-lg transition-all duration-300 flex gap-x-5 justify-between border p-4 rounded-md">
            <div className="flex gap-x-5 items-center">
                <LayoutDashboardIcon />
                <p className="flex flex-col">
                    <span>{itemProps.name}</span>
                    <span className="text-xs">{itemProps.topicCount} Topics</span>
                </p>
            </div>
            <Button
                onClick={()=> {
                    router.push(`${pathname}/${itemProps.id}`)
                }}
                className="text-xs self-end hover:cursor-pointer bg-secondary-450 hover:bg-secondary-600 rounded text-black"
            >
                Continue
            </Button>
        </div>
    )
}
export default MyLearningListItem
