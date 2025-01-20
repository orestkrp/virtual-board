"use server";

import { authFetch } from "@/lib/auth-fetch";
import { ChangeEmailFormState } from "@/lib/types";
import { ChangeEmailFormSchema } from "@/lib/validation";
import { revalidateTag } from "next/cache";

export const changeEmail = async (
  state: ChangeEmailFormState,
  formData: FormData
): Promise<ChangeEmailFormState> => {
  const validationFields = ChangeEmailFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }
  const data = JSON.stringify(validationFields.data);
  try {
    const response = await authFetch<any>("user/email", {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });

    revalidateTag("user");
  } catch (e) {
    return {
      message: "Failed to update e-mail",
    };
  }
};
