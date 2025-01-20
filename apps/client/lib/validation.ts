import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export const SignupFormSchema = z.object({
  name: z.string().min(3, { message: "Name is too short" }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export const ChangeEmailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export const ChangePasswordFormSchema = z.object({
  newPassword: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
  password: z.string().min(1, {
    message: "Password field must not be empty.",
  }),
});

export const InviteMembersSchema = z.object({
  emails: z.array(z.string().email("Emails are not valid")),
});

export const RenameFieldSchema = z.object({
  name: z.string().min(3, "Value is too short").max(32, "Value is too long"),
});
