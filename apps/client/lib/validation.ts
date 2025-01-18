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

export const InviteMembersSchema = z.object({
  emails: z.array(z.string().email("Emails are not valid")),
});

export const RenameTeamSchema = z.object({
  name: z.string().min(3, "Name is too short").max(32, "Name is too long"),
});
