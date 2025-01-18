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

  let response;
  try {
    response = await fetch(`${BACKEND_URL}/${url}`, options);
  } catch (error: any) {
    throw new Error(`Network error: ${error.message}`);
  }

  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("Unauthorized and no refresh token available");
    }

    try {
      const newAccessToken = await refreshToken(session.refreshToken);

      if (newAccessToken) {
        options.headers.Authorization = `Bearer ${newAccessToken}`;
        try {
          response = await fetch(`${BACKEND_URL}/${url}`, options);
        } catch (error: any) {
          throw new Error(`Network error after refresh: ${error.message}`);
        }
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error: any) {
      throw new Error(`Error refreshing token: ${error.message}`);
    }
  }

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage += `: ${errorData?.message || "Unknown error from server"}`;
    } catch {
      errorMessage += ` and could not parse error response.`;
    }
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (error: any) {
    throw new Error(`Failed to parse JSON response: ${error.message}`);
  }
};
