"use client"

import React, {useEffect, useState} from 'react'
import Navbar from "@/components/elements/Navbar";
import {useGetAuthUserQuery} from "@/state/api";
import {NAVBAR_HEIGHT} from "@/lib/constants";
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
            if (
                userRole === "instructor" && pathname.startsWith("/students") ||
                userRole === "students" && pathname.startsWith("/instructors")
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
        <SidebarProvider>
            {/*<div className="min-h-screen w-full bg-primary-100">*/}
                <AppSidebar userType={authUser.userRole.toLowerCase()}/>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                        </div>
                        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
                    </div>
                    {/*<Navbar/>*/}
                    {/*<div style={{paddingTop: `${NAVBAR_HEIGHT}px`}}>*/}
                    {/*    <main className="flex">*/}
                    {/*        <div className={"grow transition-all duration-300"}>*/}
                    {/*            {children}*/}
                    {/*        </div>*/}
                    {/*    </main>*/}
                    {/*</div>*/}
                </SidebarInset>
            {/*</div>*/}
        </SidebarProvider>
    )
}
export default DashboardLayout;
