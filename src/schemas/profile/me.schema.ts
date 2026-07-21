import { z } from "zod";

export const ItsMeUserSchema = z.object({
  data: z.object({
    id: z.int(),
    last_name: z.string(),
    first_name: z.string(),
    user_name: z.string(),
    description: z.string().nullable(),
    email: z.email(),
    phone: z.string().nullable(),
    bde_id: z.int(),
    avatar_url: z.url().nullable(),
    admission_year: z.int(),
    created_at: z.string(),
    updated_at: z.string(),
    email_verified_at: z.string(),
    sector: z.string(),
    sector_id: z.int(),
    birth_date: z.string().nullable(),
  }),
  organizations: z.array(
    z.object({
      id: z.int(),
      name: z.string(),
      role: z.string(),
      logo_url: z.url().nullable(),
    })
  ),
});

export type ItsMeUserData = z.infer<typeof ItsMeUserSchema>;