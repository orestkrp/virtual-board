"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const toggleFavorite = async (id: string) => {
  const response = await authFetch<any>(`board/${id}/fovorite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.error) {
    return { error: "Failed to favorite" };
  }

  revalidateTag("boards");
  return response;
};
