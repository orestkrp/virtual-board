import { TeamSwitcher } from "@/app/dashboard/_components/dashbaord-sidebar/team-switcher";
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
import { settingsSidebarItems } from "@/lib/constants";
import { ITeam } from "@/types/database";
import { FC } from "react";

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
            <SidebarMenu>
              {settingsSidebarItems.map((item) => (
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
