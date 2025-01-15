"use client";

import { createBoard } from "@/actions/create.board";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { FC } from "react";

interface BoardsTopBar {
  activeTeamId: string;
}

export const BoardsTopBar: FC<BoardsTopBar> = ({ activeTeamId }) => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Boards in this team</h2>
        <Button
          onClick={() =>
            createBoard(activeTeamId).then(() => {
              toast({ title: "New boars was created" });
            })
          }
        >
          <Plus />
          Create new
        </Button>
      </div>
    </>
  );
};
