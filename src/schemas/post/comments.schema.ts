import { AuthorSchema } from "@/schemas/author.schema";
import { z } from "zod";

const RootSchema = z.object({
  id: z.int(),
  post_id: z.int(),
  user_id: z.int(),
  created_since: z.string(),
  parent_comment_id: z.int().nullable(),
  body: z.string(),
  children_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  reaction_count: z.number(),
  reaction: z
    .object({
      id: z.int(),
      icon: z.string(),
    })
    .nullable(),
  author: AuthorSchema,
});

const metaSchema = z.object({
  total: z.number(),
  total_same_parent_id: z.int(),
  per_page: z.number(),
  current_page: z.number(),
  last_page: z.number(),
  first_page_url: z.url(),
  last_page_url: z.url(),
  next_page_url: z.string().nullable(),
  prev_page_url: z.string().nullable(),
  path: z.url(),
  from: z.number(),
  to: z.number(),
  in_page: z.number(),
});

export const CommentsSchema = z.object({
  data: z.array(RootSchema),
  meta: metaSchema,
});

export type CommentsData = z.infer<typeof CommentsSchema>;