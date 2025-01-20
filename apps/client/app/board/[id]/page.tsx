import { FC } from "react";

import "tldraw/tldraw.css";
import { Room } from "./room";
import { authFetch } from "@/lib/auth-fetch";

interface BoardProps {
  params: { id: string };
}

const Board: FC<BoardProps> = async ({ params }) => {
  const board = await authFetch<any>(`board/${params.id}`);

  return <Room board={board} />;
};

export default Board;
