"use client"

import React, {useEffect} from 'react';
import {useGetAuthUserQuery, useGetProfileQuery} from "@/state/api";
import {useRouter} from "next/navigation";

const NonDashboardLayout = ({children}: {children: React.ReactNode}) => {

    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const {data: profile, isLoading: profileLoading} = useGetProfileQuery(
        authUser?.cognitoInfo.userId || "",
        {skip: !authUser?.cognitoInfo.userId}
    );
    const router = useRouter();

    useEffect(() => {
        if (authUser && profile) {
            router.push(authUser?.userRole==="instructor" ?
                `/instructors/subjects` : `/students/mylearning`);
        }
    }, [authUser, profile, router]);

    if (authLoading || profileLoading) {
        return (
            <div className="w-full items-center justify-center h-full gap-y-5 flex flex-col">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default NonDashboardLayout;