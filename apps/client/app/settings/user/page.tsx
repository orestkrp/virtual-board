import { Loading } from "@/app/board/_components/loading";
import { authFetch } from "@/lib/auth-fetch";
import { IUser } from "@/types/database";
import { FC } from "react";
import { UserProfile } from "./_components/user-pofile";

export const User: FC = async () => {
  const userDetails = await authFetch<IUser>(`user`, {
    method: "GET",
    next: { tags: ["user"] },
  });

  if (!userDetails) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <UserProfile userDetails={userDetails} />
    </div>
  );
};

export default User;
