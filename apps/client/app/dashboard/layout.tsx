import { FC, PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashbaord-sidebar";
import { DashboardHeader } from "./_components/dashboard-header";
import { authFetch } from "@/lib/auth-fetch";
import { ITeam } from "@/types/database";
import { getSession } from "@/lib/session";
import { getCurrentTeam } from "@/actions/meta";

const DashbaordLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession();
  const currentTeamId = await getCurrentTeam();
  if (!session) {
    return null;
  }

  const teams = await authFetch<ITeam[]>("team", {
    method: "GET",
    next: { tags: ["teams"] },
  });

  return (
    <SidebarProvider>
      <DashboardSidebar teams={teams} />
      <main className="w-full flex flex-col h-screen box-border">
        <DashboardHeader user={session.user} currentTeamId={currentTeamId} />
        <div className="p-6 flex flex-col flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashbaordLayout;
