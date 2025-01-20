"use server";

import { authFetch } from "@/lib/auth-fetch";
import { revalidateTag } from "next/cache";

export const uploadImage = async (formData: FormData) => {
  try {
    await authFetch<any>("user/image/upload", {
      method: "POST",
      body: formData,
    });

    revalidateTag("user");
  } catch (e: any) {
    throw e;
  }
};
