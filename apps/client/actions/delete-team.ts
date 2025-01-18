"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const deleteTeam = async (id: string) => {
  const response = await authFetch<any>(`team/${id}`, {
    method: "DELETE",
  });
  if (response.error) {
    return { error: "Failed to delete team" };
  }

  revalidateTag("teams");
  revalidateTag(id);
  return response;
};
