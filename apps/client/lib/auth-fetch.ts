"use server";
import { refreshToken } from "@/actions/auth";
import { getSession } from "./session";
import { BACKEND_URL } from "./constants";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async <Data>(
  url: string | URL,
  options: FetchOptions = {}
): Promise<Data> => {
  const session = await getSession();

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
    "Content-Type": "application/json",
  };
  let response = await fetch(`${BACKEND_URL}/${url}`, options);

  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("refresh token not found!");
    }

    const newAccessToken = await refreshToken(session.refreshToken);

    if (newAccessToken) {
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    }
  }

  return await response.json();
};
