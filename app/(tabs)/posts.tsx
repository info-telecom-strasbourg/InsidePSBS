import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import { Filters } from "@/features/posts/filters";
import { Post } from "@/features/posts/post";
import { Search } from "@/features/posts/search";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useFilters } from "@/queries/posts/filters.query";
import { usePosts } from "@/queries/posts/posts.query";
import { FlashList } from "@shopify/flash-list";

import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const InfiniteScrollList = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");

  const { data, isLoading, error, size, setSize, isRefreshing, handleRefresh } =
    usePosts(selectedId, searchPhrase);

  const { data: filters } = useFilters();

  const modalRouter = useModalRouter();

  const items = data ? data.flat() : [];

  const loadMore = () => {
    setSize(size + 1);
  };

  return (
    <PageContainer>
      <Header
        title="Publications"
        rightIcon="settings"
        leftIcon="inside-psbs"
      />
      <View className="mb-4 gap-5">
        <Search searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
        <Filters
          data={filters}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </View>
      <FlashList
        data={items}
        keyExtractor={(item) => item?.id.toString() || ""}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => modalRouter.open(`/post/${item?.id}`)}
            className="mb-4"
          >
            <Post
              item={item}
              isLoading={isLoading}
              error={error}
              postId={item?.id}
            />
          </TouchableOpacity>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={5}
        // ListFooterComponent={() => (isLoading ? <ActivityIndicator /> : null)}
        estimatedItemSize={100}
        // initialNumToRender={10} // Adjust as needed
        // maxToRenderPerBatch={100} // Adjust as needed
        // windowSize={21} // Adjust as needed
      />
    </PageContainer>
  );
};

export default InfiniteScrollList;
