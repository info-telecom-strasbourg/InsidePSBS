import { useFetch } from "@/hooks/useFetch";
import {
    PostsSchema,
    type PostsData,
} from "@/schemas/post/post.schema";

export const usePosts = () => {
  return useFetch<PostsData>({
    apiEndpoint: "post",
    schema: PostsSchema,
    queryKey: ["posts"],
  });
};