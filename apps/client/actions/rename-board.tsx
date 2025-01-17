"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const renameBoard = async (title: string, id: string) => {
  const data = JSON.stringify({ title });
  const response = await authFetch<any>(`board/${id}/name`, {
    method: "PUT",
    body: data,
  });

  if (response.error) {
    return { error: "Failed to rename board" };
  }

  revalidateTag("boards");
  return response;
};
