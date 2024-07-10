import type { InfiniteFlashListProps } from "@/components/primitives/infinite-flashlist";
import InfiniteFlashList from "@/components/primitives/infinite-flashlist";
import type { CommentsData } from "@/schemas/posts/comments.schema";

export const Comments = ({
  data,
  renderItem,
  size,
  setSize,
}: InfiniteFlashListProps<CommentsData["data"][0] | undefined>) => {
  return (
    <InfiniteFlashList<CommentsData["data"][0] | undefined>
      data={data}
      renderItem={renderItem}
      size={size}
      setSize={setSize}
      estimatedItemSize={100}
    />
  );
};
