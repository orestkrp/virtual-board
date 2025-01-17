"use client";

import { FC } from "react";
import { BoardCard } from "./board-card";
import { IBoard } from "@/types/database";
import { useSearchParams } from "next/navigation";

interface BoardsListProps {
  boards: IBoard[];
}

export const BoardsList: FC<BoardsListProps> = ({ boards }) => {
  const query = useSearchParams();
  const onlyFavorites = query.has("favorites");

  const filteredBoards = boards.filter((board) =>
    onlyFavorites ? board.isFavorite : true
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
      {filteredBoards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};
