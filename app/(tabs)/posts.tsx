import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import { Filters } from "@/features/posts/filters";
import { Post } from "@/features/posts/post";
import { Search } from "@/features/posts/search";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useFilters } from "@/queries/posts/filters.query";
import { usePosts } from "@/queries/posts/posts.query";
import { useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";

export default function AnnouncementsPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");

  const { data, isLoading, error, size, setSize, isRefreshing, handleRefresh } =
    usePosts(selectedId, searchPhrase);

  const { data: filters } = useFilters();

  const modalRouter = useModalRouter();

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
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <>
          <FlatList
            data={data}
            contentContainerClassName="gap-4"
            showsVerticalScrollIndicator={false}
            debug={true}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
            onEndReached={() => {
              const length = data.length - 1;
              if (
                data[length]?.meta.last_page &&
                data[length].meta.last_page >= size
              )
                setSize(size + 1);
            }}
            onEndReachedThreshold={3}
            renderItem={({ item }) => (
              <View className="gap-4">
                {item?.data.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => modalRouter.open(`/post/${item.id}`)}
                  >
                    <Post
                      item={item}
                      interactions
                      isLoading={isLoading}
                      error={error}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        </>
      )}
    </PageContainer>
  );
}
