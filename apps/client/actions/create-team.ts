"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";
import { setCurrentTeam } from "./meta";
import { ITeam } from "@/types/database";

export const createTeam = async (name: string) => {
  const data = JSON.stringify({ name: name });

  try {
    const response = await authFetch<ITeam>("team", {
      method: "POST",
      body: data,
    });

    revalidateTag("teams");

    setCurrentTeam(response.id);

    return response;
  } catch (e) {
    return { error: "Failed trename boardo create team" };
  }
};
