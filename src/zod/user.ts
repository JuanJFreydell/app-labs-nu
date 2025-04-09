import { z } from "zod";

export const basicUserInfoSchema = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string(),
  avatarUrl: z.string().url().or(z.string().max(0)).nullable(),
  isProfileComplete: z.boolean(),
});

export type BasicUserInfo = z.infer<typeof basicUserInfoSchema>;

export const userSettingsFormSchema = z.object({
  firstName: z.string().max(100, "Must be 100 characters or less"),
  lastName: z.string().max(100, "Must be 100 characters or less"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(
      (email) => email.endsWith("@northeastern.edu"),
      "Email must be a Northeastern University email address (@northeastern.edu)",
    ),
  avatarUrl: z.string().url().or(z.string().max(0)),
  jobTitle: z.string().max(100, "Must be 100 characters or less"),
  linkedinUrl: z.string().url().or(z.string().max(0)),
  githubUrl: z.string().url().or(z.string().max(0)),
  interests: z
    .string()
    .min(1, "Must be at least 1 character")
    .max(100, "Must be 100 characters or less")
    .array()
    .max(8, "You can only list 8 interests"),
  skills: z
    .string()
    .min(1, "Must be at least 1 character")
    .max(100, "Must be 100 characters or less")
    .array()
    .max(8, "You can only list 8 skills"),
  isProfileComplete: z.boolean(),
  // preferences: z.undefined(),
  isProfilePublic: z.boolean(),
});

export type UserSettingsForm = z.infer<typeof userSettingsFormSchema>;
