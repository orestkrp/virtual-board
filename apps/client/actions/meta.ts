"use server";

import { cookies } from "next/headers";

export const setCurrentTeam = async (teamId: string) => {
  const cookiesFetched = await cookies();

  cookiesFetched.set("currentTeam", teamId, {
    httpOnly: true,
  });
};

export const getCurrentTeam = async () => {
  const cookiesFetched = await cookies();

  return cookiesFetched.get("currentTeam")?.value;
};
