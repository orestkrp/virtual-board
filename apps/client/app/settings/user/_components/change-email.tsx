import { changeEmail } from "@/actions/change-email";
import { SubmitButton } from "@/app/auth/signin/_components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import { useFormState } from "react-dom";

export const ChangeEmailForm: FC = () => {
  const [state, action] = useFormState(changeEmail, undefined);
  return (
    <form action={action}>
      <div className="flex items-center gap-4">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="new-password"
            id="email"
            name="email"
            placeholder="Your e-mail"
          />
          {state?.error?.email && (
            <p className="text-sm text-red-500">{state?.error.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="new-password"
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
          />
          {state?.error?.password && (
            <p className="text-sm text-red-500">{state?.error?.password}</p>
          )}
        </div>
      </div>
      <div>
        <SubmitButton fullWIdth={false}>Change email</SubmitButton>
      </div>
    </form>
  );
};
