import { z } from "zod";

export const ItsMeUserSchema = z.object({
  data: z.object({
    id: z.number(),
    last_name: z.string(),
    first_name: z.string(),
    user_name: z.string(),
    description: z.string().nullable(),
    email: z.string().email(),
    phone: z.string().nullable(),
    bde_id: z.number(),
    avatar_url: z.string().url().nullable(),
    admission_year: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    email_verified_at: z.string(),
    sector: z.string(),
    birth_date: z.string().nullable(),
  }),
  organizations: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      role: z.string(),
      logo_url: z.string().url().nullable(),
    })
  ),
});

export type ItsMeUserData = z.infer<typeof ItsMeUserSchema>;
