"use client";

import { FC, PropsWithChildren } from "react";
import { useOthersMapped, useSelf } from "@liveblocks/react/suspense";
import {
  DefaultCursor,
  DefaultMainMenu,
  DefaultMainMenuContent,
  DefaultStylePanel,
  Tldraw,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
} from "tldraw";
import { useStorageStore } from "@/hooks/use-storage-store";
import "tldraw/tldraw.css";
import { Loading } from "../_components/loading";
import { Avatars } from "../_components/avatars";
import { IBoard } from "@/types/database";
import { useRenameModal } from "@/store/use-raname-modal";
import { useRouter } from "next/navigation";

interface RoomProps {
  board: IBoard;
}

export const Room: FC<PropsWithChildren<RoomProps>> = ({ board }) => {
  const id = useSelf((me) => me.id);
  const info = useSelf((me) => me.info);
  const connectionId = useSelf((me) => me.connectionId);

  const store = useStorageStore({
    user: { id: id, color: info.color, name: info.name },
  });

  if (typeof connectionId !== "number") {
    return <Loading />;
  }

  return (
    <div className="h-full w-full">
      <Tldraw
        store={store}
        autoFocus
        options={{ maxPages: 1 }}
        components={{
          MainMenu: () => <CustomMainMenu board={board} />,
          StylePanel: () => (
            <div
              style={{
                display: "flex-column",
                marginTop: 4,
              }}
            >
              <Avatars />
              <DefaultStylePanel />
            </div>
          ),
          Cursor: ({ point, zoom, name, chatMessage }) => {
            const users = useOthersMapped((user) => user.info);
            const current = users.find(
              ([connectionId, info]) => info.name === name
            );
            return (
              <DefaultCursor
                point={point}
                zoom={zoom}
                name={name}
                chatMessage={chatMessage}
                color={current ? current[1].color : "#82512c"}
              />
            );
          },
        }}
      />
    </div>
  );
};

interface CustomMainMenuProps {
  board: IBoard;
}

const CustomMainMenu: FC<CustomMainMenuProps> = ({ board }) => {
  const { onOpen } = useRenameModal();
  const router = useRouter();
  return (
    <DefaultMainMenu>
      <div>
        <TldrawUiMenuGroup id="example">
          <h2 className="p-3 text-center bg-blue-500 text-white">
            {board.title}
          </h2>
          <TldrawUiMenuItem
            id="Dashboard"
            label="Dashboard"
            readonlyOk
            onSelect={() => {
              router.push("/dashboard");
            }}
          />
          <TldrawUiMenuItem
            id="Title"
            label="Change name"
            readonlyOk
            onSelect={() => {
              onOpen(board.id, board.title);
            }}
          />
        </TldrawUiMenuGroup>
      </div>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
};
