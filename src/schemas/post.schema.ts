import { z } from "zod";

// Define the schema for the author
const authorSchema = z.object({
  is_organization: z.boolean(),
  id: z.number(),
  name: z.string(),
  short_name: z.string().nullable(),
  logo_url: z.string().nullable().optional(),
});

// Define the schema for a single post
const postSchema = z.object({
  id: z.number(),
  body: z.string(),
  date: z.string(),
  color: z.string(),
  category: z.string(),
  updated_at: z.string(),
  author: authorSchema,
});

// Define the schema for the meta object
const metaSchema = z.object({
  total: z.number(),
  per_page: z.number(),
  current_page: z.number(),
  last_page: z.number(),
  first_page_url: z.string().url(),
  last_page_url: z.string().url(),
  next_page_url: z.string().url().nullable(),
  prev_page_url: z.string().nullable(),
  path: z.string().url(),
  from: z.number(),
  to: z.number(),
});

// Define the schema for the API response
export const PostSchema = z.object({
  data: z.array(postSchema),
  meta: metaSchema,
});

export type PostData = z.infer<typeof PostSchema>;
