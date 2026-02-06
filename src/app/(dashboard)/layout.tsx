"use client"

import React, {useEffect, useState} from 'react'
import {useGetAuthUserQuery} from "@/state/api";
import AppSidebar from "@/components/elements/AppSidebar";
import {usePathname, useRouter} from "next/navigation";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
            } else {
                setIsLoading(false)
            }
        }
    }, [authUser, router, pathname]);

    if (authLoading || isLoading) return <>Loading...</>;
    if (!authUser?.userRole) return null;

    return (
        <SidebarProvider className="overflow-x-hidden">
                <AppSidebar userType={authUser.userRole.toLowerCase()}/>
                <SidebarInset className="h-screen">
                    <header className="flex h-[7vh] shrink-0 items-center gap-2 border-b-2 border-black px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                    </header>
                    <div className="flex w-full h-[80vh] flex-1 flex-col gap-4 p-4 px-6">
                        {children}
                    </div>
                </SidebarInset>
        </SidebarProvider>
    )
}
export default DashboardLayout;
