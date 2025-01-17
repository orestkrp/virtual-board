"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const deleteBoard = async (id: string) => {
  const response = await authFetch<any>(`board/${id}`, {
    method: "DELETE",
  });

  if (response.error) {
    return { error: "Failed to delete board" };
  }

  revalidateTag("boards");
  return response;
};
