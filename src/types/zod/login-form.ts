import { z } from "zod";

// Create a schema for form validation
export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(
      (email) => email.endsWith("@northeastern.edu"),
      "Email must be a Northeastern University email address (@northeastern.edu)"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
});

// Type for the form data
export type LoginFormData = z.infer<typeof loginSchema>;
