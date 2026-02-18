"use client"

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

const SettingsLayout = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname();

    const links: {label: string; href: string}[] = [
        {label: "Profile", href: "/profile"},
        // {label: "Notifications", href: "/notifications"},
        {label: "Billing & Payments", href: "/billing"},
        // {label: "Security", href: "/security"},
    ];

    return (
        <div className="max-w-300 w-full h-full py-5 gap-y-5 flex flex-col">
            <section className="space-y-4">
                <p className="font-semibold">Settings</p>
                <p className="text-xs text-muted-foreground font-medium">
                    Update your profile, adjust notification preferences, manage payments, and configure your account settings.
                </p>
            </section>
            <div className="border gap-x-2 font-medium p-1 text-xs rounded-sm flex">
                {
                    links.map((link, index) => {
                        const isActive = pathname === "/students/settings" + link.href;
                        return (
                            <Link
                                key={index}
                                href={"/students/settings" + link.href}
                                className={`py-1.5 px-5 rounded ${ isActive ? "bg-[#9e9e9e]/15" : "" }`}
                            >
                                {link.label}
                            </Link>
                        )
                    })
                }
            </div>
            <div className="w-full h-full">
                {children}
            </div>

        </div>
    );
};

export default SettingsLayout;