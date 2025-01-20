"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const inviteMembers = async (
  formData: { emails: string[] },
  teamId: string
) => {
  const data = JSON.stringify(formData);
  const response = await authFetch<any>(`team/${teamId}/members`, {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" },
  });

  if (response.error) {
    return { error: "Failed to add members" };
  }

  revalidateTag(teamId);
  return response;
};
