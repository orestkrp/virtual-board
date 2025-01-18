"use client";

import React, { useState, useCallback, FC } from "react";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { RenameTeamSchema } from "@/lib/validation";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface DebouncedInputProps extends React.ComponentProps<"input"> {
  sendRequest: (value: string) => Promise<any>;
  label: string;
}

export const DebouncedInput: FC<DebouncedInputProps> = ({
  sendRequest,
  type,
  value,
  name,
  placeholder,
  className,
  label,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [message, setMessage] = useState({ message: "", requestStatus: "" });

  const debouncedRequest = useCallback(
    debounce((value) => {
      const validationFields = RenameTeamSchema.safeParse({
        name: value,
      });

      if (!validationFields.success) {
        const error = validationFields.error.flatten().fieldErrors.name;
        setMessage({
          message: error ? error[0] : "",
          requestStatus: "failed",
        });
      } else {
        sendRequest(value).then((result) => {
          if (result.error) {
            setMessage({
              message: "Failed to change the team name",
              requestStatus: "failed",
            });
          } else {
            setMessage({
              message: "Team name succesfully changed",
              requestStatus: "success",
            });
          }
        });
      }
    }, 500),
    []
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    setMessage({
      message: "",
      requestStatus: "",
    });
    debouncedRequest(e.target.value);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor={name} className="text-xl font-semibold">
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
      />
      {message.message && (
        <p
          className={cn(
            message.requestStatus === "success"
              ? "text-green-500"
              : "text-red-500",
            "text-sm"
          )}
        >
          {message.message}
        </p>
      )}
    </div>
  );
};
