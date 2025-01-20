"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AVATAR_BG, BACKEND_URL } from "@/lib/constants";
import { generateColorFromHash, getFallback } from "@/lib/utils";
import { FC } from "react";

interface UserAvatarProps {
  name?: string;
  avatar: string | null;
}

export const UserAvatar: FC<UserAvatarProps> = ({ name, avatar }) => {
  const fallback = name ? getFallback(name) : "";
  const color = name ? generateColorFromHash(name) : AVATAR_BG;
  const src = avatar ? `${BACKEND_URL}/user/image/${avatar}` : "";

  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback
        style={{ backgroundColor: color ? color : AVATAR_BG }}
        className="text-white"
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};
