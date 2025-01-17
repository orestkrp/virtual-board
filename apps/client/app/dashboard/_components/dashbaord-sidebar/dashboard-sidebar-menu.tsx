"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

export const DashboardSidebarMenu: FC = () => {
  const query = useSearchParams();
  const onlyFavorites = query.has("favorites");

  const dashboardSidebarItems = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      isActive: !onlyFavorites,
    },
    {
      title: "Favorites",
      url: "/dashboard?favorites=true",
      icon: Star,
      isActive: onlyFavorites,
    },
  ];
  return (
    <SidebarMenu>
      {dashboardSidebarItems.map((item) => (
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
