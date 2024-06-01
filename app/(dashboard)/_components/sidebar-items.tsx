"use client";

import { LucideIcon } from "lucide-react";

interface sidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({
     icon: Icon,
     label,
     href
     }: sidebarItemProps) => {
  return <div>
    Sidebar active

  </div>;
};
