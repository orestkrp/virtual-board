import { authFetch } from "@/lib/auth-fetch";
import { getSession } from "@/lib/session";
import { FC } from "react";

export const Dashboard: FC = async () => {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const user = await authFetch(`user`, { method: "GET" });
  return <div className="">Dashbaord</div>;
};

export default Dashboard;
