"use client";

import { FC, memo } from "react";
import Image from "next/image";
import { useOthersMapped } from "@liveblocks/react";
import { useSelf } from "@liveblocks/react/suspense";
import { UserAvatar } from "@/app/dashboard/_components/dashboard-header/user-avatar";

export const Avatars: FC = memo(() => {
  const currentUser = useSelf((user) => user.info);
  const users = useOthersMapped((user) => user.info);

  return (
    <div className="flex justify-end p-1 px-2">
      {users.map(([connectionId, info]) => {
        return <UserAvatar key={connectionId} userName={info.name} />;
      })}

      {currentUser && <UserAvatar userName={currentUser.name} />}
    </div>
  );
});

export const Avatar = ({
  picture,
  name,
}: {
  picture: string;
  name: string;
}) => {
  return (
    <div
      className="relative flex flex-shrink-0 items-center justify-center w-9 h-9 -ml-2.5 border-4 border-gray-200 rounded-full bg-gray-400 hover:before:opacity-100"
      data-tooltip={name}
    >
      <Image
        alt={name}
        src={picture}
        className="w-full h-full rounded-full"
        data-tooltip={name}
      />
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 text-xs text-white bg-black rounded-md opacity-0 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};
