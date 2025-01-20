import { changePassword } from "@/actions/change-password";
import { SubmitButton } from "@/app/auth/signin/_components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import { useFormState } from "react-dom";

export const ChangePasswordForm: FC = () => {
  const [state, action] = useFormState(changePassword, undefined);
  return (
    <form action={action}>
      <div className="flex items-center gap-4">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="new-password"
            id="password"
            type="password"
            name="password"
            placeholder="Your password"
          />
          {state?.error?.password && (
            <p className="text-sm text-red-500">{state?.error.password}</p>
          )}
        </div>

        <div>
          <Label htmlFor="newPassword">New password</Label>
          <Input
            autoComplete="new-password"
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Your new password"
          />
          {state?.error?.newPassword && (
            <p className="text-sm text-red-500">{state?.error?.newPassword}</p>
          )}
        </div>
      </div>
      <div>
        <SubmitButton fullWIdth={false}>Change password</SubmitButton>
      </div>
    </form>
  );
};
