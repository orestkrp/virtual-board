"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

interface UserAvatarProps {
  name?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ name }) => {
  const fallback = name
    ? name
        .split(" ")
        .map((sub) => sub[0])
        .join()
        .toUpperCase()
    : "";

  return (
    <Avatar>
      <AvatarImage src="#" />
      <AvatarFallback className="bg-cyan-500 text-white">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};
