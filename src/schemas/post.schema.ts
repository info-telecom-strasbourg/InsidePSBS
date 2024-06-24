import { z } from "zod";

// Define the schema for the author
const authorSchema = z.object({
  is_organization: z.boolean(),
  id: z.number(),
  name: z.string(),
  short_name: z.string().nullable(),
  logo_url: z.string().url().nullable(),
});

// Define the schema for a single post
const onePostSchema = z.object({
  id: z.number(),
  body: z.string(),
  created_since: z.string(),
  color: z.string(),
  category: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  reaction_count: z.number(),
  medias: z.array(
    z.object({ id: z.number(), url: z.string().url(), type: z.string() })
  ),
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
export const PostsSchema = z.object({
  data: z.array(onePostSchema),
  meta: metaSchema,
});

export const SinglePostSchema = z.object({
  data: z.object({
    id: z.number(),
    body: z.string(),
    created_since: z.string(),
    color: z.string(),
    category: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    reaction_count: z.number(),
    medias: z.array(
      z.object({ id: z.number(), url: z.string().url(), type: z.string() })
    ),
    author: authorSchema,
  }),
});

export type PostsData = z.infer<typeof PostsSchema>;
export type SinglePostData = z.infer<typeof SinglePostSchema>;
