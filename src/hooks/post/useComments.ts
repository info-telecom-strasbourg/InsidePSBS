import { useFetch } from "@/hooks/useFetch";
import {
    CommentsSchema,
    type CommentsData,
} from "@/schemas/post/comments.schema";

export const useComments = (postId: string | number) => {
  return useFetch<CommentsData>({
    apiEndpoint: `post/${postId}/comment`,
    schema: CommentsSchema,
    queryKey: ["comments", String(postId)],
  });
};