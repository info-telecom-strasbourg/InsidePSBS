import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  last_name: z.string(),
  first_name: z.string(),
  user_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  bde_id: z.number(),
  avatar_url: z.string().url(),
  promotion_year: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  email_verified_at: z.string(),
  sector: z.string(),
  birth_date: z.string().nullable(),
});

export const ItsMeUserSchema = z.object({
  data: UserSchema,
});

export type ItsMeUserData = z.infer<typeof ItsMeUserSchema>;
