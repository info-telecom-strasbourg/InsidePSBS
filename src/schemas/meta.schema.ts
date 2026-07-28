import { z } from "zod";

export const MetaSchema = z.object({
  total: z.number(),
  per_page: z.number(),
  current_page: z.number(),
  last_page: z.number(),
  first_page_url: z.url(),
  last_page_url: z.url(),
  next_page_url: z.string().nullable(),
  prev_page_url: z.string().nullable(),
  path: z.url(),
  from: z.number().nullable(),
  to: z.number().nullable(),
});