"use server";

import { authFetch } from "@/lib/auth-fetch";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const deleteUser = async () => {
  try {
    await deleteSession();
    redirect("/auth/signin");
  } catch (e: any) {
    return { error: e.message };
  }
};
