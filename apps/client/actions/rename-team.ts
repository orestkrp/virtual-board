"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const renameTeam = async (id: string, name: string) => {
  const data = JSON.stringify({ name });
  const response = await authFetch<any>(`team/${id}/name`, {
    method: "PUT",
    body: data,
    headers: { "Content-Type": "application/json" },
  });

  if (response.error) {
    return { error: "Failed to rename team" };
  }

  revalidateTag("teams");
  return response;
};
