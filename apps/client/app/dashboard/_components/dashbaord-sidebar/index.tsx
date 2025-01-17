import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FC } from "react";
import { TeamSwitcher } from "./team-switcher";
import { ITeam } from "@/types/database";
import { getCurrentTeam } from "@/actions/meta";
import { DashboardSidebarMenu } from "./dashboard-sidebar-menu";

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
            <DashboardSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
