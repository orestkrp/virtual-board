"use server";

import { BACKEND_URL } from "@/lib/constants";

import { redirect } from "next/navigation";
import { AuthFormState } from "@/lib/types";
import { LoginFormSchema, SignupFormSchema } from "@/lib/validation";
import { createSession, updateSession } from "@/lib/session";

export async function signUp(
  state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect("/auth/signin");
  } else {
    const res = await response.json();
    return {
      message: res.message,
    };
  }
}

export const signIn = async (
  state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.ok) {
    const result = await response.json();

    await createSession({
      user: {
        id: result.id,
        name: result.name,
        role: result.role,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    redirect("/dashboard");
  } else {
    const res = await response.json();
    return {
      message: res.message,
    };
  }
};

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token" + response.statusText);
    }

    const { accessToken, refreshToken } = await response.json();

    updateSession({ accessToken, refreshToken });

    return accessToken;
  } catch (err) {
    return null;
  }
};
