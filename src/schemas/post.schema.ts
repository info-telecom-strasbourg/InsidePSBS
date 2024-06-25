import { z } from "zod";
import { AuthorSchema } from "./author.schema";

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
  author: AuthorSchema,
});

// Define the schema for the meta object
const metaSchema = z.object({
  total: z.number(),
  per_page: z.number(),
  current_page: z.number(),
  last_page: z.number(),
  first_page_url: z.string().url(),
  last_page_url: z.string().url(),
  next_page_url: z.string().nullable(),
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
    author: AuthorSchema,
  }),
});

export type PostsData = z.infer<typeof PostsSchema>;
export type SinglePostData = z.infer<typeof SinglePostSchema>;
