import React from 'react'
import {usePathname} from "next/navigation";
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

const AppSidebar = ({userType}: AppSidebarProps) => {
    const pathname = usePathname();
    const {toggleSidebar, open} = useSidebar();

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
            className="fixed left-0 bg-secondary-400 shadow-lg"

        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className={cn(
                            "flex min-h-14 w-full items-center pt-3 mb-3",
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
            <SidebarContent className={`${open? "px-4" : "" } `}>
                <SidebarMenu className="space-y-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <SidebarMenuItem key={link.href}>
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        "flex rounded-sm items-center px-7 py-4",
                                        isActive
                                            ? "bg-primary-100 font-semibold"
                                            : "text-gray-100 hover:bg-primary-100",
                                        open ? "text-blue-600" : "ml-[5px]"
                                    )}
                                >
                                    <Link href={link.href} className="w-full" scroll={false}>
                                        <div className="flex items-center gap-3">
                                            <link.icon className={`h-5 w-5 stroke-[2px] ${isActive ? "text-black": "text-gray-600"}`}/>
                                            <span className={`text-black ${isActive ? "text-black" : "font-medium"}`}>
                                                {link.label}
                                            </span>
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
