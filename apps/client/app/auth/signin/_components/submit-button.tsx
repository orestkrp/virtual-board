"use client";

import { Button } from "@/components/ui/button";
import { FC, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton: FC<PropsWithChildren> = ({ children }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className="w-full mt-2">
      {pending ? "Submitting..." : children}
    </Button>
  );
};
