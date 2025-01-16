"use server";

import { authFetch } from "@/lib/auth-fetch";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const signOut = async () => {
  const response = await authFetch<any>("auth/signout", {
    method: "POST",
  });

  if (response.error) {
    return { error: "Failed to log out" };
  }
  deleteSession();
  redirect("/auth/signin");
};
