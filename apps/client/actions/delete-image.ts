"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const deleteImage = async () => {
  try {
    await authFetch<any>("user/image/delete", {
      method: "POST",
    });

    revalidateTag("user");
  } catch (e: any) {
    throw e;
  }
};
