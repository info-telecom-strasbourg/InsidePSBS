import { z } from "zod";
import { AuthorSchema } from "../author.schema";
import { MetaSchema } from "../meta.schema";

// Define the schema for a single post
const onePostSchema = z.object({
  id: z.number(),
  body: z.string(),
  uploaded_since: z.string(),
  uploaded_at: z.string(),
  color: z.string(),
  category: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  reaction_count: z.number(),
  has_reacted: z.string().nullable(),
  comment_count: z.number(),
  medias: z.array(
    z.object({ id: z.number(), url: z.string().url(), type: z.string() })
  ),
  author: AuthorSchema,
});

export const PostsSchema = z.object({
  data: z.array(onePostSchema),
  meta: MetaSchema,
});

export const SinglePostSchema = z.object({
  data: z.object({
    body: z.string(),
    uploaded_since: z.string(),
    uploaded_at: z.string(),
    color: z.string(),
    category: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    reaction_count: z.number(),
    has_reacted: z.string().nullable(),
    comment_count: z.number(),

    medias: z.array(
      z.object({ id: z.number(), url: z.string().url(), type: z.string() })
    ),
    author: AuthorSchema,
  }),
});

export type PostsData = z.infer<typeof PostsSchema>;
export type SinglePostData = z.infer<typeof SinglePostSchema>;
