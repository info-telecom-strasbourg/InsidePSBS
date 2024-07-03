import { z } from "zod";

export const AddReactionOnPostSchema = z.object({
  reaction_type_id: z.number(),
  post_id: z.number(),
});

export type AddReactionOnPostData = z.infer<typeof AddReactionOnPostSchema>;
