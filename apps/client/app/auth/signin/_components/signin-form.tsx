"use client";
import { signIn } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";

export const SignInForm = () => {
  const [state, action] = useFormState(signIn, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="Your e-mail" />
          {state?.error?.email && (
            <p className="text-sm text-red-500">{state?.error.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
          />
          {state?.error?.password && (
            <p className="text-sm text-red-500">{state?.error?.password}</p>
          )}
        </div>
        <div className="flex justify-center">
          <SubmitButton>Sign in</SubmitButton>
        </div>
        <div className="flex justify-between text-sm">
          <p> Don't have an account? </p>
          <Link className="text-sm underline" href="/auth/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};
