import { useFetch } from "@/hooks/useFetch";
import {
    SinglePostSchema,
    type SinglePostData,
} from "@/schemas/post/post.schema";

export const useSinglePost = (postId: string | number) => {
  return useFetch<SinglePostData>({
    apiEndpoint: `post/${postId}`,
    schema: SinglePostSchema,
    queryKey: ["posts", "detail", String(postId)],
  });
};