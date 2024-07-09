import { PageContainer } from "@/components/primitives/container";
import InfiniteFlashList from "@/components/primitives/infinite-flashlist";
import { Header } from "@/features/layout/header";
import { Filters } from "@/features/posts/filters";
import { Post } from "@/features/posts/post";
import { Search } from "@/features/posts/search";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useFilters } from "@/queries/posts/filters.query";
import { usePosts } from "@/queries/posts/posts.query";
import type { PostsData } from "@/schemas/posts/post.schema";
import type { ListRenderItem } from "@shopify/flash-list";

import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

const InfiniteScrollList = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");

  const { data, isLoading, size, setSize, isRefreshing, handleRefresh } =
    usePosts(selectedId, searchPhrase);

  const { data: filters } = useFilters();

  const modalRouter = useModalRouter();

  const items = data ? data.flat() : [];

  const renderPosts: ListRenderItem<PostsData["data"][0] | undefined> = ({
    item,
  }) => (
    <TouchableOpacity
      onPress={() => modalRouter.open(`/post/${item?.id}`)}
      className="mb-4"
    >
      <Post item={item} isLoading={isLoading} postId={item?.id} />
    </TouchableOpacity>
  );
  const HeaderComponent = () => {
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
      <InfiniteFlashList<PostsData["data"][0] | undefined>
        data={items}
        size={size}
        setSize={setSize}
        ListHeaderComponent={HeaderComponent}
        renderItem={renderPosts}
        estimatedItemSize={350}
        estimatedListSize={{ height: 1000, width: 250 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </PageContainer>
  );
};

export default InfiniteScrollList;
