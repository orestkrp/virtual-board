import { authFetch } from "@/lib/auth-fetch";
import { getSession } from "@/lib/session";
import { generateColorFromHash } from "@/lib/utils";
import { Liveblocks } from "@liveblocks/node";

const secretKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!;

const liveblocks = new Liveblocks({
  secret: secretKey,
});

export const POST = async (request: Request) => {
  const userSession = await getSession();

  if (!userSession) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  const user = await authFetch<any>("user", { method: "GET" });

  const userInfo = {
    name: user.name || "Unknown",
    avatar: user.avatar,
    color: generateColorFromHash(user.id),
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status });
};
