import { useFetch } from "@/hooks/useFetch";
import {
    ReactionsSchema,
    type ReactionsData,
} from "@/schemas/post/add-reaction.schema";

export const useReactions = (postId: string | number) => {
  return useFetch<ReactionsData>({
    apiEndpoint: `post/${postId}/reaction`,
    schema: ReactionsSchema,
    queryKey: ["reactions", String(postId)],
  });
};