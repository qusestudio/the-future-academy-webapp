"use client"

import React from 'react'
import {useGetAuthUserQuery} from "@/state/api";
import {usePathname, useRouter} from "next/navigation";
import {signOut} from "@aws-amplify/auth";
import {NAVBAR_HEIGHT} from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import {Bell, MessageCircle, Plus, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar = () => {

    const { data: authUser } = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();

    const isDashboardPage = pathname.includes("/instructor") || pathname.includes("/student");

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/"
    }

    return (
        <div className="fixed top-0 left-0 w-full z-50 shadow-xl"
             style={{height: `${NAVBAR_HEIGHT}px`}}
        >
            <div className={"flex justify-between items-center w-full py-3 px-8 bg-primary-50 text-black"}>
                <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        className={"cursor-pointer hover:text-primary-800"}
                        scroll={false}
                        href={"/"}>
                        <div className={"flex items-center gap-3"}>
                            {/*<Image*/}
                            {/*    src={"/logo.svg"}*/}
                            {/*    alt={"Rentiful Logo"}*/}
                            {/*    width={24}*/}
                            {/*    height={24}*/}
                            {/*    className={"w-6 h-6"}*/}
                            {/*/>*/}
                            <div className="text-xl font-bold">
                                TheFuture
                                <span className={"text-secondary-500 font-light hover:text-primary-300"}>
                                    Academy
                                </span>
                            </div>
                        </div>
                    </Link>
                    {
                        isDashboardPage && authUser && (
                            <Button
                                variant={"secondary"}
                                className={"md:ml-4 bg-secondary-450 rounded text-white hover:bg-secondary-450 hover:text-primary-50"}
                                onClick={() => {
                                    router.push(
                                        authUser.userRole?.toLowerCase() === "instructor"
                                            ? "/instructor/newsubject"
                                            : "/student/dashboard"
                                    )
                                }}
                            >
                                {
                                    authUser.userRole?.toLowerCase() === "instructor" ? (
                                        <>
                                            <Plus className="h-4 w-4"/>
                                            <span className="hidden md:block ml-2">Add New Subject </span>
                                        </>
                                    ) : (
                                        <>
                                            <Search className="h-4 w-4"/>
                                            <span className="hidden bg md:block ml-2">
                                                Search Subject
                                            </span>
                                        </>
                                    )
                                }
                            </Button>
                        )
                    }
                </div>
                {
                    !isDashboardPage && (<p className={"text-primary-200 hidden md:block"}>
                        Discover your perfect rental apartment with our advanced search
                    </p>)
                }
                <div className="flex items-center pr-10 gap-5">
                    {
                        authUser ? (
                            <>
                                <div className="relative hidden md:block">
                                    <MessageCircle className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                                    <span className={"absolute top-0 right-0 w-2 h-2 bg-secondary-400 rounded-full"}></span>
                                </div>
                                <div className="relative hidden md:block">
                                    <Bell className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                                    <span className={"absolute top-0 right-0 w-2 h-2 bg-secondary-400 rounded-full"}></span>
                                </div>

                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                                        <Avatar>
                                            <AvatarImage src={authUser.userInfo?.image}/>
                                            <AvatarFallback className="bg-primary-600 text-white">
                                                {authUser.userRole?.[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-primary-200 hidden md:block">
                                            {authUser.userInfo?.name}
                                        </p>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white text-primary-700">
                                        <DropdownMenuItem
                                            className="cursor-pointer hover:bg-primary-700 hover:text-primary-100 font-bold"
                                            onClick={() => {
                                                router.push(
                                                    authUser.userRole?.toLowerCase() === "manager"
                                                        ? "/managers/properties"
                                                        : "/tenants/favorites",
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
                            </>
                        ) : (
                            <>
                                <Link href={"/signin"}>
                                    <Button
                                        variant={"outline"}
                                        className={"text-white hover:cursor-pointer border-white bg-transparent"}
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={"/signup"}>
                                    <Button
                                        variant={"secondary"}
                                        className={"text-white hover:cursor-pointer border-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"}
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Navbar
