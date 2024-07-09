import type { FlashListProps } from "@shopify/flash-list";
import { FlashList } from "@shopify/flash-list";

type InfiniteFlashListProps<T> = {
  size: number;
  setSize: (size: number) => void;
} & FlashListProps<T>;

const InfiniteFlashList = <T,>({
  size,
  setSize,
  ...props
}: InfiniteFlashListProps<T>) => {
  const loadMore = () => {
    setSize(size + 1);
  };
  return (
    <FlashList<T>
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={5}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
};

export default InfiniteFlashList;
