import { z } from "zod";

export const UserProfileSchema = z.object({
  data: z.object({
    id: z.number(),
    last_name: z.string(),
    first_name: z.string(),
    user_name: z.string(),
    description: z.string().nullable(),
    avatar_url: z.string().nullable(),
    admission_year: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    sector: z.string(),
    birth_date: z.string().nullable(),
  }),
});

export type UserProfileData = z.infer<typeof UserProfileSchema>;
