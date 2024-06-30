"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface sidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: sidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  //one for check if it is in root page and for another is if it is in exact same page and last is for parant path for specific page>>>>
  const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`)

  const handleSelect = () => {
    router.push(href);
  }

  return (
    <button
    onClick={handleSelect}
    type="button"
    className={cn("flex items-center text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20", isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700")}
     >
        <div className="flex items-center gap-x-2 py-4">
            <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
            />
            {label}

        </div>
        <div className={cn("ml-auto border-2 opacity-0 border-sky-600 h-full transition-all", isActive && "opacity-100")}/>


    </button>


  )
};
