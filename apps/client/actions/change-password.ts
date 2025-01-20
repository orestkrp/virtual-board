"use server";

import { authFetch } from "@/lib/auth-fetch";
import { ChangePasswordFormState } from "@/lib/types";
import { ChangePasswordFormSchema } from "@/lib/validation";
import { revalidateTag } from "next/cache";

export const changePassword = async (
  state: ChangePasswordFormState,
  formData: FormData
): Promise<ChangePasswordFormState> => {
  const validationFields = ChangePasswordFormSchema.safeParse({
    newPassword: formData.get("newPassword"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const data = JSON.stringify(validationFields.data);
  try {
    await authFetch<any>("user/password", {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("user");
  } catch (e: any) {
    return {
      message: e.message,
    };
  }
};
