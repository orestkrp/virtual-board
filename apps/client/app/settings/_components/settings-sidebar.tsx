import { TeamSwitcher } from "@/app/dashboard/_components/dashbaord-sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ITeam } from "@/types/database";
import { FC } from "react";
import { SettingsSidebarMenu } from "./settings-sidebar-menu";

interface SettingsSidebarProps {
  teams: ITeam[];
  currentTeamId?: string;
}

export const SettingsSidebar: FC<SettingsSidebarProps> = ({
  teams,
  currentTeamId,
}) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={teams} currentTeamId={currentTeamId} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SettingsSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
