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
import {Book, CircuitBoard, Library, Menu, Settings, X} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useGetAuthUserQuery} from "@/state/api";
import {signOut} from "@aws-amplify/auth";

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
            {icon: Book, label: "Subjects", href: "/instructors/subjects"},
            {icon: Settings, label: "Settings", href: "/instructors/settings"},
        ]
        : [
            {icon: Library, label: "My learning", href: "/students/mylearning"},
            {icon: CircuitBoard, label: "Enrollments", href: "/students/enrollments"},
            {icon: Settings, label: "Settings", href: "/students/settings"},
        ];

    return (
        <Sidebar
            collapsible="icon"
            className="fixed left-0  border-r-black border-r-3 shadow-lg"

        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className={cn(
                            "flex min-h-14 w-full items-center mb-3",
                            open ? "justify-between px-6" : "justify-center"
                        )}>
                            {
                                open? (
                                        <>
                                            <h1 className="text-primary-900">
                                                {userType === "instructor" ? "Instructor View": "Student View"}
                                            </h1>
                                            <button
                                                className="hover:bg-gray-100 p-2 rounded-md"
                                                onClick={()=> toggleSidebar()}
                                            >
                                                <X className="h-6 w-6 text-gray-600" />
                                            </button>
                                        </>
                                    ) :
                                    (
                                        <button
                                            className="hover:bg-gray-100 p-2 rounded-md"
                                            onClick={()=> toggleSidebar()}
                                        >
                                            <Menu className="h-6 w-6 text-gray-600" />
                                        </button>
                                    )
                            }
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={` flex flex-col font-medium  justify-between pb-5 ${open? "px-4" : "" }`}>
                <SidebarMenu className="space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.includes("/instructors/"+link.href);
                        return (
                            <SidebarMenuItem key={link.href}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "flex rounded-sm transition-all duration-300  items-center justify-start px-7 py-5",
                                        isActive
                                            ? "bg-yellow-300 "
                                            : "text-gray-100 border-transparent hover:bg-primary-100",
                                        open ? "text-black" : "ml-[5px]"
                                    )}
                                >
                                    <Link href={link.href} className="w-full" scroll={false}>
                                        <div className="flex items-center gap-3">
                                            <link.icon className={`h-5 w-5  text-black ${isActive ? "text-black": ""}`}/>
                                            <span className={`text-black ${isActive ? "text-black font-medium" : ""}`}>
                                                {link.label}
                                            </span>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>

                {
                    authUser && (
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger className="flex px-1 bg-primary-100 py-1 rounded-full items-center gap-2 focus:outline-none">
                                <Avatar>
                                    <AvatarImage src={authUser.userInfo?.image}/>
                                    <AvatarFallback className="bg-primary-600 text-white">
                                        { authUser.userInfo?.name[0].toUpperCase() || authUser.userRole?.[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-black capitalize text-sm">
                                    {authUser.userInfo?.name || "Profile"}
                                </p>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white text-primary-700">
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-primary-700 hover:text-primary-100 font-bold"
                                    onClick={() => {
                                        router.push(
                                            authUser.userRole?.toLowerCase() === "instructor"
                                                ? "/instructors/subjects"
                                                : "/students/mylearning",
                                            { scroll: false }
                                        )
                                    }}
                                >
                                    Go to Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-primary-200" />
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-primary-700 hover:text-primary-100"
                                    onClick={() => {
                                        router.push(`${authUser.userRole?.toLowerCase()}s/settings`,
                                            {scroll:false}
                                        )
                                    }}
                                >
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-primary-200" />
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-primary-700 hover:text-primary-100"
                                    onClick={handleSignOut}
                                >
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </SidebarContent>
        </Sidebar>
    )
}
export default AppSidebar;
