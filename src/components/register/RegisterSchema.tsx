import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Please enter a valid email"),

    username: z
      .string()
      .nonempty("Username is required")
      .regex(
        /^[a-zA-Z0-9-._@+]+$/,
        "Username can only contain letters, numbers, and - . _ @ +"
      ),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
