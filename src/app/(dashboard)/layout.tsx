"use client"

import React, {useEffect, useState} from 'react'
import {useGetAuthProfileQuery, useGetAuthUserQuery} from "@/state/api";
import AppSidebar from "@/components/elements/AppSidebar";
import { usePathname, useRouter} from "next/navigation";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const {data: studentProfile, isLoading: profileLoading} = useGetAuthProfileQuery();

    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!profileLoading) {
            if (authUser && !studentProfile) {
                router.push("/onboarding");
            }
        }

        if (authUser) {
            const userRole = authUser.userRole.toLowerCase();
            console.log("User information: " + authUser.userInfo);
            if (
                userRole === "instructor" && pathname.startsWith("/students") ||
                userRole === "student" && pathname.startsWith("/instructors")
            ) {
                router.push(
                    userRole === "instructor"
                        ? "/instructors/subjects"
                        : "/students/mylearning"
                )
            }
        }
    }, [authUser, router, pathname, studentProfile, profileLoading, setIsLoading]);

    if (authLoading || profileLoading) {
        return (
            <div className="w-full items-center justify-center h-screen gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    if (!authUser) return null;

    return (
        <SidebarProvider className="overflow-x-hidden">
            <AppSidebar userType={authUser.userRole.toLowerCase()}/>
            <SidebarInset className="h-screen">
                <header className="flex h-[7vh] shrink-0 items-center justify-between gap-2 border-b-2  px-4">
                    <div className="flex items-center gap-2 shrink-0">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <p className="font-medium">{studentProfile?.firstName}</p>
                    </div>
                    <div className="px-3 py-1.5 text-white bg-pink-950 text-xs rounded-full"><p>Test Mode</p></div>
                </header>
                <div className="flex w-full items-center h-[80vh] flex-1 flex-col gap-4 px-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
export default DashboardLayout;
