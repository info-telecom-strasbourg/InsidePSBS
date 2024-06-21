import { z } from "zod";

const authorSchema = z.object({
  is_organization: z.boolean(),
  id: z.number(),
  name: z.string(),
  short_name: z.string().nullable(),
  logo_url: z.string().nullable(),
});

const dataSchema = z.object({
  body: z.string(),
  date: z.string(),
  color: z.string(),
  category: z.string(),
  updated_at: z.string(),
  author: authorSchema,
});

export const SinglePostSchema = z.object({
  data: dataSchema,
});

export type SinglePostData = z.infer<typeof SinglePostSchema>;
