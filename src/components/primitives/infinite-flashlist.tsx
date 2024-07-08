import type { FlashListProps } from "@shopify/flash-list";
import { FlashList } from "@shopify/flash-list";

type InfiniteFlashListProps<T> = {
  size: number;
  setSize: (size: number) => void;
} & FlashListProps<T>;

const InfiniteFlashList = <T,>(props: InfiniteFlashListProps<T>) => {
  const loadMore = () => {
    props.setSize(props.size + 1);
  };
  return (
    <FlashList<T>
      data={props.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={props.renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={5}
      estimatedItemSize={props.estimatedItemSize}
    />
  );
};

export default InfiniteFlashList;
