"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const SettingsSidebarMenu: FC = () => {
  const path = usePathname();
  console.log(path);

  const settingsSidebarItems = [
    {
      title: "User",
      url: "/settings/user",
      icon: User,
      isActive: path === "/settings/user",
    },
    {
      title: "Team",
      url: "/settings/team",
      icon: Users,
      isActive: path === "/settings/team",
    },
  ];

  return (
    <SidebarMenu>
      {settingsSidebarItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
