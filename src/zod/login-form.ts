import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(
      (email) => email.endsWith("@northeastern.edu"),
      "Email must be a Northeastern University email address (@northeastern.edu)",
    ),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits long")
    .refine((value) => /^\d*$/.test(value), "OTP code is numbers only"),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
