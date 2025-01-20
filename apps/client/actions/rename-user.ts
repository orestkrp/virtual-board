"use server";

import { authFetch } from "@/lib/auth-fetch";
import { updateSessionUser } from "@/lib/session";
import { revalidateTag } from "next/cache";

export const renameUser = async (name: string) => {
  const data = JSON.stringify({ name });
  const response = await authFetch<any>(`user/name`, {
    method: "PUT",
    body: data,
    headers: { "Content-Type": "application/json" },
  });

  if (response.error) {
    return { error: "Failed to rename team" };
  }

  revalidateTag("user");
  updateSessionUser(name);
  return response;
};
