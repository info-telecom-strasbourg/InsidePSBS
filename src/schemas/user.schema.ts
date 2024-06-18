import { z } from "zod";

export const LoginUserSchema = z.object({
  id: z.number(),
  user_name: z.string(),
  last_name: z.string(),
  first_name: z.string(),
  sector_id: z.number(),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  promotion_year: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type LoginUser = z.infer<typeof LoginUserSchema>;
