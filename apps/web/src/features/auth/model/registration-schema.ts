import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must be at most 100 characters."),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(254, "Email must be at most 254 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be at most 128 characters.")
      .regex(/[a-z]/, "Password must include a lowercase letter.")
      .regex(/[A-Z]/, "Password must include an uppercase letter.")
      .regex(/\d/, "Password must include a number."),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegistrationValues = z.infer<typeof registrationSchema>;
