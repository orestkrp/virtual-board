import { FC } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { UserDropdown } from "./user-dropdown";
import { Session } from "@/lib/types";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface DashboardHeaderProps {
  user: Session["user"];
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b-[1px] border-slate-200">
      <div>
        <Link href="/">
          <h1
            className={cn(
              font.className,
              "text-cyan-500 font-bold text-2xl capitalize"
            )}
          >
            V-board
          </h1>
        </Link>
      </div>
      <div className="flex gap-4">
        <Button>
          <UserPlus />
          Invite members
        </Button>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};
