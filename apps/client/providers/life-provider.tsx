"use client";

import { Loading } from "@/app/board/_components/loading";
import { LiveMap } from "@liveblocks/client";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { FC, PropsWithChildren } from "react";

interface LifeProviderProps {
  roomId: string;
  publicApiKey: string;
}

export const LifeProvider: FC<PropsWithChildren<LifeProviderProps>> = ({
  children,
  roomId,
  publicApiKey,
}) => {
  return (
    <LiveblocksProvider publicApiKey={publicApiKey} throttle={16}>
      <RoomProvider
        id={roomId}
        initialPresence={{
          presence: null,
        }}
        initialStorage={{
          records: new LiveMap<string, any>(),
        }}
      >
        <ClientSideSuspense fallback={<Loading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
