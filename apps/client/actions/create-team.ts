"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";
import { setCurrentTeam } from "./meta";

export const createTeam = async (name: string) => {
  const data = JSON.stringify({ name: name });

  try {
    const response = await authFetch<any>("team", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("teams");

    setCurrentTeam(response.id);

    return response;
  } catch (e) {
    return { error: "Failed to create team" };
  }
};
