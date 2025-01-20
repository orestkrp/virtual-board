import { FC } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { UserDropdown } from "../../../../components/user-dropdown";
import { Session } from "@/lib/types";
import { logoFont } from "@/lib/constants";
import { InviteMembers } from "@/components/invite-members";
import { IUser } from "@/types/database";

interface DashboardHeaderProps {
  user: IUser;
  currentTeamId?: string;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  user,
  currentTeamId,
}) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b-[1px] border-slate-200">
      <div>
        <Link href="/dashboard">
          <h1
            className={cn(
              logoFont.className,
              "text-cyan-500 font-bold text-2xl capitalize"
            )}
          >
            V-board
          </h1>
        </Link>
      </div>
      <div className="flex gap-4">
        {currentTeamId && <InviteMembers currentTeamId={currentTeamId} />}
        <UserDropdown user={user} />
      </div>
    </header>
  );
};
