import React, {useState} from 'react'
import {ArrowDown} from "lucide-react";
import Link from "next/link";

function TopicListSidebar({children}: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col gap-y-3 ">
            {children}
        </div>
    )
}

function TopicListSidebarItem({sidebarItemProps}: { sidebarItemProps: TopicListSidebarItemProps }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-2 rounded-md">
            <button onClick={() => setOpen(!open)}
                    className="p-2 w-full rounded-md px-4 flex justify-between items-center hover:cursor-pointer">
                <p className="">{sidebarItemProps.name}</p>
                <ArrowDown
                    className={`transition-transform size-5 text-muted-foreground duration-200 ${open ? "rotate-180" : ""}`}/>
            </button>
            {open && (
                <div className="bg-white border-t rounded-b-md  border-black">
                    <Link
                        href={`/`}
                        className={`flex items-center justify-between px-4 py-2 border-b border-black last:border-b-0 hover:bg-[#FFF3C6] transition`}
                    >
                        <span className="underline text-sm">Lesson 1</span>
                    </Link>
                </div>
            )}
        </div>
    )
}

export {
    TopicListSidebarItem,
    TopicListSidebar
}
