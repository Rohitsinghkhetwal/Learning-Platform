"use client"
import { Compass, Layout } from "lucide-react"
import { SidebarItem } from "./sidebar-items";

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

export const SidebarRoutes = () => {
    const route = SidebarRoute;
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