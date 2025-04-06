import { z } from "zod";

export const basicUserInfo = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string(),
  avatarUrl: z.string().url().nullable(),
  isProfileComplete: z.boolean(),
});

export type BasicUserInfo = z.infer<typeof basicUserInfo>;
