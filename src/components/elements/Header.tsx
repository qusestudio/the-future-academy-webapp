"use client";

import Link from "next/link";
import {ForwardRefExoticComponent, RefAttributes, useEffect, useState} from "react";
import { usePathname } from "next/navigation";
import {ArrowUpRight, LucideProps, Menu, X} from "lucide-react";

export function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setOpen(false);
    }, [pathname]);


    const handleNavClick = () => setOpen(false);

    const linkList: {link: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, label: string}[] = [
        {link: "/", icon: ArrowUpRight, label: "Home"},
        {link: "/", icon: ArrowUpRight, label: "Features"},
        {link: "/", icon: ArrowUpRight, label: "Subjects"},
        {link: "/", icon: ArrowUpRight, label: "For Students"},
        {link: "/", icon: ArrowUpRight, label: "For Instructors"},
        {link: "/", icon: ArrowUpRight, label: "Pricing"},

    ]

    return (
        <header className="fixed backdrop-blur-2xl flex justify-center dark:text-[#e1e1e1]  z-40 top-0 left-0 w-full">

            {/* Desktop nav */}
            <header className="w-full px-10 hidden lg:flex py-10 items-center justify-between max-w-400">
                <p className="font-medium text-[20px]">The Future Academy</p>
                <nav className="text-xs flex font-medium gap-x-5 uppercase">
                    <Link href={"/"}>
                        Home
                    </Link>
                    <Link href={"/"}>
                        Features
                    </Link>
                    <Link href={"/"}>
                        Subjects
                    </Link>
                    <Link href={"/"}>
                        For Students
                    </Link>
                    <Link href={"/"}>
                        For Instructors
                    </Link>
                    <Link href={"/"}>
                        Pricing
                    </Link>
                </nav>
                <Link href={"/signin"} className="flex bg-[#942D00] text-white rounded-xs px-10 font-medium py-2 text-xs gap-x-5 uppercase">
                    Log in
                </Link>
            </header>

            {/* Mobile header */}
            <div className="lg:hidden  border-[#2c2c2c]  w-full backdrop-blur-2xl">
                <div className="flex text-black dark:text-white w-full backdrop-blur-2xl items-center gap-x-2 max-sm:px-5 px-10 py-5">
                    <button
                        type="button"
                        aria-label={open ? "Close menu" : "Open menu"}
                        onClick={() => setOpen((v) => !v)}
                        className=""
                    >
                        {open ? <X className="stroke-1" size={60} /> : <Menu className="stroke-1" size={60} />}
                    </button>
                    <Link href={"/"}>
                        <p className="font leading-6 text-2xl">The <br /> Future <br /> Academy</p>
                    </Link>
                </div>

                {/* Collapsible menu */}
                {open && (
                    <nav className="text-4xl text-black dark:text-white max-sm:px-5 pt-10 px-10 font-normal py-5 border-b border-white  flex flex-col font-space gap-y-5 gap-x-5 uppercase">
                        {linkList.map((link, index) => (
                            <div className="flex items-center underline" key={index}>
                                <Link onClick={handleNavClick} href={link.link}>
                                    {link.label}
                                </Link>
                                <link.icon size={40} />
                            </div>
                        ))}
                        <button className="flex bg-[#942D00] text-white justify-center rounded-xs px-10 font-medium py-2 gap-x-5 uppercase">
                            Log in
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
}