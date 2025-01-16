"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const createTeam = async (name: string) => {
  const data = JSON.stringify({ name: name });
  const response = await authFetch<any>("team", {
    method: "POST",
    body: data,
  });

  if (response.error) {
    return { error: "Failed to create team" };
  }

  revalidateTag("teams");
  return response;
};
