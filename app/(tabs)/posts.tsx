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

const InfiniteScrollList = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");

  const { data, isLoading, size, setSize } = usePosts(selectedId, searchPhrase);

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
      <InfiniteFlashList<PostsData["data"][0] | undefined>
        data={items}
        size={size}
        setSize={setSize}
        renderItem={renderPosts}
        estimatedItemSize={300}
      />
    </PageContainer>
  );
};

export default InfiniteScrollList;
