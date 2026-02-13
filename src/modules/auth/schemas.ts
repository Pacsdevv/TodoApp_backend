import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must have at least 2 characters").max(50),
    email: z.string().email("Invalid email format").max(255),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long")
      .max(16),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password required"),
  }),
});
