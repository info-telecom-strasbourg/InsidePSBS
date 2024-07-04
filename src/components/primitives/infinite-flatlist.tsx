import type { FlatListProps } from "react-native";
import { FlatList } from "react-native";

function InfiniteFlatlist<T>(props: FlatListProps<T>) {
  return (
    <FlatList
      data={props.data}
      renderItem={props.renderItem}
      onEndReached={props.onEndReached}
      onEndReachedThreshold={0.6}
      initialNumToRender={10}
      maxToRenderPerBatch={100}
      windowSize={21}
    />
  );
}

export default InfiniteFlatlist;
