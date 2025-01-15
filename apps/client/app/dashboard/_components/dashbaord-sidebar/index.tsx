import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FC } from "react";
import { TeamSwitcher } from "./team-switcher";
import { dashboardSidebarItems } from "@/lib/constants";
import { ITeam } from "@/types/database";
import { getCurrentTeam } from "@/actions/meta";

interface DashboardSidebarProps {
  teams: ITeam[];
}

export const DashboardSidebar: FC<DashboardSidebarProps> = async ({
  teams,
}) => {
  const currentTeamId = await getCurrentTeam();
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={teams} currentTeamId={currentTeamId} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardSidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
