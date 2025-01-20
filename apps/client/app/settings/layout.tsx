import { SidebarProvider } from "@/components/ui/sidebar";
import { FC, PropsWithChildren } from "react";
import { SettingsSidebar } from "./_components/settings-sidebar";
import { authFetch } from "@/lib/auth-fetch";
import { ITeam, IUser } from "@/types/database";
import { getCurrentTeam } from "@/actions/meta";
import { getSession } from "@/lib/session";
import { SettingsHeader } from "./_components/setting-header";

const SettingsLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const currentTeamId = await getCurrentTeam();

  const userDetails = await authFetch<IUser>(`user`, {
    method: "GET",
    next: { tags: ["user"] },
  });

  const teams = await authFetch<ITeam[]>("team", {
    method: "GET",
    next: { tags: ["teams"] },
  });

  return (
    <SidebarProvider>
      <SettingsSidebar teams={teams} currentTeamId={currentTeamId} />
      <main className="w-full flex flex-col h-screen box-border">
        <SettingsHeader user={userDetails} />
        <div className="flex flex-col flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default SettingsLayout;
