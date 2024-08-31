import { z } from "zod";

export const AuthorSchema = z.object({
  user_is_author: z.boolean(),
  is_organization: z.boolean(),
  id: z.number(),
  name: z.string(),
  user_name: z.string(),
  short_name: z.string().nullable(),
  logo_url: z.string().url().nullable(),
});
