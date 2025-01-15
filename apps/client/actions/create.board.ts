"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const createBoard = async (teamId: string) => {
  const data = JSON.stringify({ title: "Untitled" });
  await authFetch(`board/${teamId}`, {
    method: "POST",
    body: data,
  });

  revalidateTag("boards");
};
