import { PageContainer } from "@/components/primitives/container";
import { Post, SkeletonPost } from "@/components/primitives/post";
import { Header } from "@/features/layout/header";
import { Filters } from "@/features/posts/filters";
import { Search } from "@/features/posts/search";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useFilters } from "@/queries/posts/filters.query";
import { usePosts } from "@/queries/posts/posts.query";
import type { CategoriesData } from "@/schemas/GET/posts/categories.schema";
import type { PostsData } from "@/schemas/GET/posts/post.schema";
import { FlashList } from "@shopify/flash-list";

import { memo, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export const RenderPosts = memo(function RenderPosts({
  item,
  postsAreLoading,
}: {
  item: PostsData["data"][0] | undefined;
  postsAreLoading: boolean;
}) {
  const modalRouter = useModalRouter();
  if (!item) return null;
  console.log("Posts Rendered");

  return (
    <TouchableOpacity
      onPress={() => modalRouter.open(`/post/${item?.id}`)}
      className="mb-4"
    >
      <Post item={item} isLoading={postsAreLoading} postId={item?.id} />
    </TouchableOpacity>
  );
});

const HeaderComponent = memo(function HeaderComponent({
  filters,
  selectedId,
  setSelectedId,
}: {
  filters: CategoriesData["data"] | undefined;
  selectedId: number;
  setSelectedId: (selectedId: number) => void;
}) {
  console.log("Header Rendered");
  return (
    <View className="mb-4 gap-5">
      <Filters
        data={filters}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </View>
  );
});

export default function InfiniteScrollList() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  const {
    data,
    isLoading: postsAreLoading,
    size,
    setSize,
    isRefreshing,
    handleRefresh,
  } = usePosts(selectedId, searchPhrase);

  const { data: filters } = useFilters(1);

  const items = useMemo(() => (data ? data.flat() : []), [data]);

  const loadMore = () => {
    setSize(size + 1);
  };

  return (
    <PageContainer>
      <Header
        title="Publications"
        rightIcon="notifications"
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
        onEndReachedThreshold={1}
        renderItem={({ item }) => (
          <RenderPosts item={item} postsAreLoading={postsAreLoading} />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={150}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View className="mb-4 gap-4">
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </View>
        }
      />
    </PageContainer>
  );
}
