"use client";

import { FC } from "react";
import { BoardCard } from "./board-card";
import { IBoard } from "@/types/database";

interface BoardsListProps {
  boards: IBoard[];
}

export const BoardsList: FC<BoardsListProps> = ({ boards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};
