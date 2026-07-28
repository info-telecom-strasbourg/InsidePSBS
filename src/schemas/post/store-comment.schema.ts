import { z } from "zod";

export const StoreCommentSchema = z.object({
  body: z.string(),
  post_id: z.string(),
  parent_comment_id: z.int().optional(),
});

export type StoreCommentData = z.infer<typeof StoreCommentSchema>;