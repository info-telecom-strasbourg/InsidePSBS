import { useModalRouter } from "@/hooks/useModalRouter";
import { Post } from "@app/(tabs)/posts/_features/post";
import type { PostsData } from "@app/(tabs)/posts/_features/post.schema";
import { memo } from "react";
import { TouchableOpacity } from "react-native";

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
