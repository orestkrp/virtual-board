"use client";

import { FC, PropsWithChildren } from "react";
import { useSelf } from "@liveblocks/react/suspense";
import {
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-raname-modal";

const Board: FC<PropsWithChildren> = ({ children }) => {
  const id = useSelf((me) => me.id);
  const info = useSelf((me) => me.info);
  const connectionId = useSelf((me) => me.connectionId);

  const board: IBoard = {
    id: "1",
    title: "Untitled",
    updatedAt: new Date(Date.now()).toDateString(),
    createdAt: new Date(Date.now()).toDateString(),
    imageUrl: null,
    teamId: "sf",
    authorId: "as",
  };

  const store = useStorageStore({
    user: { id: id || "id", color: "#ff0", name: info?.name || "josh" },
  });

  if (!connectionId) {
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
        }}
      />
    </div>
  );
};

export default Board;

interface CustomMainMenuProps {
  board: IBoard;
}

const CustomMainMenu: FC<CustomMainMenuProps> = ({ board }) => {
  const { onOpen } = useRenameModal();
  return (
    <DefaultMainMenu>
      <div>
        <TldrawUiMenuGroup id="example">
          <Button variant="ghost" className="px-2 w-full" asChild>
            <Link href="/">
              <h1 className={cn("text-blue-900 font-bold text-2xl capitalize")}>
                V-board
              </h1>
            </Link>
          </Button>
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
