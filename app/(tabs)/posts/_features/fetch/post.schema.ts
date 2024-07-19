import { z } from "zod";
import { AuthorSchema } from "../../../../../src/schemas/GET/author.schema";
import { MetaSchema } from "../../../../../src/schemas/GET/meta.schema";

// Define the schema for a single post
const onePostSchema = z.object({
  id: z.number(),
  event_id: z.number().nullable(),
  body: z.string(),
  uploaded_since: z.string(),
  uploaded_at: z.string(),
  color: z.string(),
  categories: z.array(
    z.object({
      name: z.string(),
    })
  ),
  created_at: z.string(),
  updated_at: z.string(),
  reaction_count: z.number(),
  reaction: z
    .object({
      id: z.number(),
      icon: z.string(),
    })
    .nullable(),
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
    id: z.number(),
    body: z.string(),
    uploaded_since: z.string(),
    uploaded_at: z.string(),
    color: z.string(),
    categories: z.array(
      z.object({
        name: z.string(),
      })
    ),
    created_at: z.string(),
    updated_at: z.string(),
    reaction_count: z.number(),
    reaction: z
      .object({
        id: z.number(),
        icon: z.string(),
      })
      .nullable(),
    comment_count: z.number(),
    medias: z.array(
      z.object({ id: z.number(), url: z.string().url(), type: z.string() })
    ),
    author: AuthorSchema,
  }),
});

export type PostsData = z.infer<typeof PostsSchema>;
export type SinglePostData = z.infer<typeof SinglePostSchema>;
