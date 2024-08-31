import { z } from "zod";

export const AddReactionOnPostSchema = z.object({
  reaction_type_id: z.number(),
  post_comment_id: z.number().optional(),
});

export const ReactionTypeSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      icon: z.string(),
    })
  ),
});

export type AddReactionOnPostData = z.infer<typeof AddReactionOnPostSchema>;
export type ReactionTypeData = z.infer<typeof ReactionTypeSchema>;
