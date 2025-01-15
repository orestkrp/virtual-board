import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Board } from "@/types/database";
import { BoardCardOverlay } from "./board-card-overlay";
import { BoardCardFooter } from "./board-card-footer";

interface BoardCardProps {
  board: Board;
}

export const BoardCard: FC<BoardCardProps> = ({ board }) => {
  const { createdAt, id, title } = board;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src="/board.webp" alt={title} fill className="object-cover" />
          <BoardCardOverlay />
          {createdAtLabel}
        </div>
        <BoardCardFooter title={title} createdAtLabel={createdAtLabel} />
      </div>
    </Link>
  );
};
