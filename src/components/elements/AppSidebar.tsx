"use client"

import React from 'react'
import {usePathname, useRouter} from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar";
import {Menu, X} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useGetAuthUserQuery} from "@/state/api";
import {signOut} from "@aws-amplify/auth";
import {DeskIcon, Knowledge01Icon, Settings03Icon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";

const AppSidebar = ({userType}: AppSidebarProps) => {
    const pathname = usePathname();
    const {toggleSidebar, open} = useSidebar();
    const router = useRouter();
    const {data: authUser} = useGetAuthUserQuery();

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/"
    }

    const navLinks = userType === "instructor"
        ? [
            {icon: Knowledge01Icon, label: "Subjects", href: "/instructors/subjects"},
            {icon: Knowledge01Icon, label: "Settings", href: "/instructors/settings"},
        ]
        : [
            {icon: DeskIcon, label: "My learning", href: "/mylearning"},
            {icon: Knowledge01Icon, label: "Enrollments", href: "/enrollments"},
            {icon: Settings03Icon, label: "Settings", href: "/settings"},
        ];

    return (
        <Sidebar
            collapsible="offcanvas"
            className="fixed left-0 shadow-lg "

        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className={cn(
                            "flex min-h-14 w-full items-center mb-3",
                            open ? "justify-between px-6" : "justify-center"
                        )}>
                            {
                                open ? (
                                        <>
                                            <h1 className="uppercase text-xs font-bold">
                                                the future academy
                                            </h1>
                                            <button
                                                className=" p-1 hover:cursor-pointer hover:bg-[#22262E] text-primary-200 rounded"
                                                onClick={() => toggleSidebar()}
                                            >
                                                <X className="h-5 w-5  "/>
                                            </button>
                                        </>
                                    ) :
                                    (
                                        <button
                                            className="hover:bg-[#] p-2 rounded-md"
                                            onClick={() => toggleSidebar()}
                                        >
                                            <Menu className="h-6 w-6 text-gray-600"/>
                                        </button>
                                    )
                            }
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={`flex flex-col  text-xs  pt-5 justify-between pb-5 ${open ? "px-4" : ""}`}>
                <SidebarMenu className="space-y-3">
                    {navLinks.map((link) => {

                        const isActive = pathname.startsWith('/students' + link.href)  || pathname.includes("/instructors/" + link.href);

                        return (
                            <SidebarMenuItem key={link.href}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "flex rounded-l-none font-semibold rounded-r uppercase hover:bg-sidebar-accent/20 transition-all ease-out text-xs  duration-100 items-center justify-start px-4 py-5",
                                        isActive
                                            ? "dark:bg-transparent from-[#1A1D23] to-[#15181D]\n" +
                                            "dark:text-sidebar-accent-foreground\n" +
                                            "border-l-3 border-sidebar-accent bg-[#eee]"
                                            : " border-transparent",
                                        open ? "" : "ml-1.25"
                                    )}
                                >
                                    <Link href={'/students'+link.href} className={`w-full`} scroll={false}>
                                        <div className="flex items-center gap-3">
                                            <HugeiconsIcon
                                                stroke={"3"}
                                                icon={link.icon}
                                                className={`h-5 stroke-3 w-5`}
                                            />
                                            {link.label}
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
export default AppSidebar;
