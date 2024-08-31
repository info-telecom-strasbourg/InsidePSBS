import { AuthorSchema } from "@/schemas/author.schema";
import { z } from "zod";

const RootSchema = z.object({
  id: z.number(),
  post_id: z.number(),
  user_id: z.number(),
  created_since: z.string(),
  parent_comment_id: z.number().nullable(),
  body: z.string(),
  children_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  reaction_count: z.number(),
  reaction: z
    .object({
      id: z.number(),
      icon: z.string(),
    })
    .nullable(),
  author: AuthorSchema,
});

const metaSchema = z.object({
  total: z.number(),
  total_same_parent_id: z.number(),
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
  in_page: z.number(),
});

export const CommentsSchema = z.object({
  data: z.array(RootSchema),
  meta: metaSchema,
});

export type CommentsData = z.infer<typeof CommentsSchema>;
