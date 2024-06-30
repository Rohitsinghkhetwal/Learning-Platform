"use client"
import { BarChart, Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebar-items";
import { usePathname } from "next/navigation";

const SidebarRoute = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    }, 
    {
        icon: Compass,
        label: "Browse",
        href: "/search"

    }
]

const TeacherRoutes = [
     {
        icon: List,
        label: "Courses",
        href: "/teacher/courses"
    }, 
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics"

    }
]
    


export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");
    const route = isTeacherPage ? TeacherRoutes :SidebarRoute; 
    return (
        <div className="flex flex-col w-full">
            {route.map((route) => (
                <SidebarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
                />
            ))}
        </div>
    )
}