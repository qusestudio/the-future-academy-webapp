"use client"

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Pencil, X,} from "lucide-react";
import {useGetAuthProfileQuery, useGetAuthUserQuery} from "@/state/api";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {EditProfileForm} from "@/components/elements/forms/student-forms";
import {IconClose} from "@aws-amplify/ui-react/internal";
import {ThemeToggle} from "@/components/elements/ThemeToggle";
import ProfilePageSkeleton from "@/components/skeletons/skeletons";

const ProfileSettings = () => {
    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const {data: profile, isLoading: profileLoading} = useGetAuthProfileQuery();

    const [toggleEditMode, setEditMode] = useState<boolean>(false);


    if (profileLoading || authLoading) {
        return (
            <ProfilePageSkeleton />
        )
    }

    const initialData = {
        firstName: profile!.firstName,
        lastName: profile!.lastName || "",
        email: authUser!.userInfo.email || "",
        phoneNumber: authUser!.userInfo.phoneNumber || "",
    }

    return (
        <main className="w-full py-5 flex-col flex gap-y-5">
            <p className="font-medium">
                My Profile
            </p>
            <div className="flex w-full justify-between">
                <div className="flex gap-x-3 items-center">
                    <Avatar>
                        <AvatarImage src={authUser?.userInfo?.image}/>
                        <AvatarFallback className="bg-primary-600 text-white">
                            {authUser?.userInfo?.name[0].toUpperCase() || authUser?.userRole?.[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-sm flex flex-col font-medium">
                        {profile?.firstName} {profile?.lastName}
                        <span className="text-muted-foreground text-xs">{authUser?.userInfo.email}</span>
                    </p>
                </div>
                <Button
                    variant={toggleEditMode? "destructive" : "outline"}
                    className="shadow-none text-xs rounded-sm  hover:cursor-pointer"
                    onClick={() => setEditMode(!toggleEditMode)}
                >
                    {

                        toggleEditMode
                            ? (<span className="items-center gap-0.5 flex">
                                <X className={"size-4"}/> Cancel
                            </span>)
                            :
                            (<>
                                <Pencil className={"size-3"}/> Edit Profile
                            </>)
                    }
                </Button>
            </div>
            <Separator/>
            {
                !toggleEditMode ?
                    <section className="rounded-md mt-5 p-4 gap-y-5 flex flex-col justify-between border">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Personal Information</p>
                        </div>
                        <div className="flex flex-col gap-y-8">
                            <div className="grid font-medium grid-cols-[30%_70%] gap-x-3 items-start  rounded-md">
                                <div className="text-xs flex flex-col gap-y-3 text-muted-foreground rounded">
                                    First Name
                                    <span className="font-medium text-sm">{profile?.firstName}</span>
                                </div>
                                <div className="text-xs flex flex-col gap-y-3 text-muted-foreground rounded">
                                    Last Name
                                    <span className="font-medium text-sm">{profile?.lastName}</span>
                                </div>
                            </div>
                            <div className="grid font-medium grid-cols-[30%_70%] gap-x-3 items-start rounded-md">
                                <div className="text-xs flex flex-col gap-y-3 text-muted-foreground rounded">
                                    Email Address
                                    <span className="font-medium text-sm">{authUser?.userInfo.email}</span>
                                </div>
                                <div className="text-xs flex flex-col gap-y-3 text-muted-foreground rounded">
                                    Phone Number
                                    <span
                                        className="font-medium text-xs">{authUser?.userInfo.phoneNumber || "XXX-XXX-XXXX"}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <EditProfileForm initialData={initialData}/>
            }
            <section className="rounded-md mt-5 p-4 gap-y-5 flex flex-col justify-between border">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Preferences</p>
                </div>
                <div className="flex flex-col gap-y-8">
                    <div className="grid font-medium  gap-x-3 items-start  rounded-md">
                        <div className="text-sm flex items-center gap-x-10 gap-y-3 text-muted-foreground rounded">
                            Theme
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProfileSettings;