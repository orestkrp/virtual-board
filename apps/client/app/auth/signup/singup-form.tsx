"use client";
import { signUp } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "../signin/_components/submit-button";

export const SignUpForm = () => {
  const [state, action] = useFormState(signUp, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        {state?.message && (
          <p className="text-sm mt-2 text-center text-red-500">
            {state.message}
          </p>
        )}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" />
          {state?.error?.name && (
            <p className="text-sm text-red-500">{state?.error?.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="Your e-mail" />{" "}
          {state?.error?.email && (
            <p className="text-sm text-red-500">{state?.error?.email}</p>
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
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.error.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <SubmitButton>Sign up</SubmitButton>
        </div>
        <div className="flex justify-between text-sm">
          <p>Already have an account?</p>
          <Link className="underline" href="/auth/signin">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
