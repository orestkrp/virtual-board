"use client";
import Link from "next/link";
import { FC, useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { BoardCardOverlay } from "./board-card-overlay";
import { BoardCardFooter } from "./board-card-footer";
import { IBoard } from "@/types/database";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toggleFavorite } from "@/actions/toggle-favorite";

interface BoardCardProps {
  board: IBoard;
}

export const BoardCard: FC<BoardCardProps> = ({ board }) => {
  const { createdAt, id, title } = board;

  const { toast } = useToast();

  const [isPending, setPending] = useState(false);
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const handleFavorite = async () => {
    setPending(true);
    await toggleFavorite(id).then((result) => {
      if (result.error) {
        toast({
          title: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: board.isFavorite
            ? "Board was unfavorited"
            : "Board was favorited",
        });
      }
    });
    setPending(false);
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src="/board.webp" alt={title} fill className="object-cover" />
          <BoardCardOverlay />
          <Actions id={id} side="right" title={title}>
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
          {createdAtLabel}
        </div>
        <BoardCardFooter
          title={title}
          disabled={isPending}
          onClick={handleFavorite}
          createdAtLabel={createdAtLabel}
          isFavorite={board.isFavorite}
        />
      </div>
    </Link>
  );
};
