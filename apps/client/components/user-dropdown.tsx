"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";
import { UserAvatar } from "../app/dashboard/_components/dashboard-header/user-avatar";
import { signOut } from "@/actions/signout";
import { Session } from "@/lib/types";
import Link from "next/link";

interface UserDropdownProps {
  user: Session["user"];
}

export const UserDropdown: FC<UserDropdownProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={user.name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        sideOffset={28}
        collisionPadding={{ right: 20 }}
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/user"> User Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/team"> Team</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
