import { z } from "zod";

export const AddReactionOnPostSchema = z.object({
  reaction_type_id: z.number(),
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
