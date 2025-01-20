import { UserDropdown } from "@/components/user-dropdown";
import { logoFont } from "@/lib/constants";
import { Session } from "@/lib/types";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/database";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface SettingsHeaderProps {
  user: IUser;
}

export const SettingsHeader: FC<SettingsHeaderProps> = ({ user }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b-[1px] border-slate-200">
      <div className="flex items-center space-x-6">
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
        <Link
          href="/dashboard"
          className="flex gap-4 items-center font-semibold text-l p-2 hover:bg-slate-100"
        >
          <GalleryVerticalEnd />
          Back to dashboard
        </Link>
      </div>
      <div className="flex gap-4">
        <UserDropdown user={user} />
      </div>
    </header>
  );
};
