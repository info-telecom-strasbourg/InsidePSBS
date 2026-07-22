import { useFetch } from "@/hooks/useFetch";
import {
    ReactionTypeSchema,
    type ReactionTypeData,
} from "@/schemas/post/add-reaction.schema";

export const useReactionTypes = (postId: string | number) => {
  return useFetch<ReactionTypeData>({
    apiEndpoint: `post/${postId}/reactiontype`,
    schema: ReactionTypeSchema,
    queryKey: ["reaction-types", String(postId)],
  });
};