import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { SkeletonPost } from "@/features/post/post";
import { PostsHeader } from "@/features/post/posts-header";
import { RenderPosts } from "@/features/post/render-posts";
import { Search } from "@/features/post/search";
import { useFilters } from "@/queries/post/filters.query";
import { usePosts } from "@/queries/post/posts.query";
import type { PostsData } from "@/schemas/post/post.schema";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function PostsPage() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  const {
    data,
    isLoading: postsAreLoading,
    size,
    setSize,
    isRefreshing,
    handleRefresh,
    hasMore,
  } = usePosts(selectedId, searchPhrase);

  const { data: filters } = useFilters(1);

  const items = useMemo(() => (data ? data.flat() : []), [data]);

  const loadMore = () => {
    if (hasMore) {
      setSize(size + 1);
    }
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
          <PostsHeader
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
