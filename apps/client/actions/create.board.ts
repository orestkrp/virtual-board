"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const createBoard = async (teamId: string) => {
  const data = JSON.stringify({ title: "Untitled" });
  const response = await authFetch<any>(`board/${teamId}`, {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" },
  });

  if (response.error) {
    return { error: "Failed to create board" };
  }

  revalidateTag("boards");
  return response;
};
