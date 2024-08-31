import { useModalRouter } from "@/hooks/useModalRouter";
import type { PostsData } from "@/schemas/post/post.schema";
import { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Post } from "./post";

export const RenderPosts = memo(function RenderPosts({
  item,
  postsAreLoading,
}: {
  item: PostsData["data"][0] | undefined;
  postsAreLoading: boolean;
}) {
  const modalRouter = useModalRouter();
  if (!item) return null;

  return (
    <TouchableOpacity
      onPress={() => modalRouter.open(`/post/${item?.id}`)}
      className="mb-4"
    >
      <Post item={item} isLoading={postsAreLoading} postId={item?.id} />
    </TouchableOpacity>
  );
});
