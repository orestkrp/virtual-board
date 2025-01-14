"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { Session } from "./types";
import { encodedKey } from "./constants";

export const createSession = async (payload: Session) => {
  const { accessToken } = payload;
  const expireDate = new Date(jwtDecode(accessToken).exp! * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const cookiesFetched = await cookies();

  cookiesFetched.set("session", session, {
    httpOnly: true,
    secure: false,
    expires: expireDate,
    sameSite: "lax",
    path: "/",
  });
};

export const getSession = async () => {
  const cookiesFetched = await cookies();
  const cookie = cookiesFetched.get("session")?.value;

  if (!cookie) {
    return null;
  }

  const { payload } = await jwtVerify(cookie, encodedKey, {
    algorithms: ["HS256"],
  });

  return payload as Session;
};

export const getCookie = async () => {
  const cookiesFetched = await cookies();
  return cookiesFetched.get("session")?.value;
};

export const deleteSession = async () => {
  const cookiesFetched = await cookies();
  cookiesFetched.delete("session");
};

export async function updateSession({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookiesFetched = await cookies();
  const cookie = cookiesFetched.get("session")?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error("Session not found");

  const newPayload: Session = {
    accessToken,
    refreshToken,
    user: {
      ...payload.user,
    },
  };

  await createSession(newPayload);
}
