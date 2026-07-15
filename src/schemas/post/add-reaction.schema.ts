import { z } from "zod";

export const AddReactionOnPostSchema = z.object({
  reaction_type_id: z.int(),
  post_comment_id: z.int().optional(),
});

export const ReactionTypeSchema = z.object({
  data: z.array(
    z.object({
      id: z.int(),
      name: z.string(),
      icon: z.string(),
    })
  ),
});

export type AddReactionOnPostData = z.infer<typeof AddReactionOnPostSchema>;
export type ReactionTypeData = z.infer<typeof ReactionTypeSchema>;