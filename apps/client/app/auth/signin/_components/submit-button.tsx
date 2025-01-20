"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  fullWIdth?: boolean;
}

export const SubmitButton: FC<PropsWithChildren<SubmitButtonProps>> = ({
  fullWIdth = true,
  children,
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={cn(fullWIdth ? "w-full" : "", "mt-2")}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};
