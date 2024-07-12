import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import { Filters } from "@/features/posts/filters";
import { Post } from "@/features/posts/post";
import { Search } from "@/features/posts/search";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useFilters } from "@/queries/posts/filters.query";
import { usePosts } from "@/queries/posts/posts.query";
import type { CategoriesData } from "@/schemas/GET/posts/categories.schema";
import type { PostsData } from "@/schemas/GET/posts/post.schema";
import { FlashList } from "@shopify/flash-list";

import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

const RenderPosts = ({
  item,
  postsAreLoading,
}: {
  item: PostsData["data"][0] | undefined;
  postsAreLoading: boolean;
}) => {
  const modalRouter = useModalRouter();
  return (
    <TouchableOpacity
      onPress={() => modalRouter.open(`/post/${item?.id}`)}
      className="mb-4"
    >
      <Post item={item} isLoading={postsAreLoading} postId={item?.id} />
    </TouchableOpacity>
  );
};

const HeaderComponent = ({
  filters,
  selectedId,
  setSelectedId,
}: {
  filters: CategoriesData["data"] | undefined;
  selectedId: number;
  setSelectedId: (selectedId: number) => void;
}) => {
  return (
    <View className="mb-4 gap-5">
      <Filters
        data={filters}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </View>
  );
};

export default function InfiniteScrollList() {
  const [selectedId, setSelectedId] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");

  const {
    data,
    isLoading: postsAreLoading,
    size,
    setSize,
    isRefreshing,
    handleRefresh,
  } = usePosts(selectedId, searchPhrase);

  const { data: filters } = useFilters(1);

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
      <View className="mb-4">
        <Search searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
      </View>
      <FlashList<PostsData["data"][0] | undefined>
        data={items}
        ListHeaderComponent={
          <HeaderComponent
            filters={filters}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={5}
        renderItem={({ item }) => (
          <RenderPosts item={item} postsAreLoading={postsAreLoading} />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </PageContainer>
  );
}
