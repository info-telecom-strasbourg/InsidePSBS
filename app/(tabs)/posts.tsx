import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import { Filters } from "@/features/posts/filters";
import { Post } from "@/features/posts/post";
import { Search } from "@/features/posts/search";
import { useModalRouter } from "@/hooks/useModalRouter";
import { usePosts } from "@/queries/posts/posts.query";
import { useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";

export default function AnnouncementsPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");

  const { data, isLoading, error, size, setSize, isRefreshing, handleRefresh } =
    usePosts(selectedId, searchPhrase);

  const modalRouter = useModalRouter();

  // TODO: Implémenter les erreurs

  return (
    <PageContainer>
      <Header
        title="Publications"
        rightIcon="settings"
        leftIcon="inside-psbs"
      />
      <View className="mb-4 gap-5">
        <Search searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
        <Filters selectedId={selectedId} setSelectedId={setSelectedId} />
      </View>
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <>
          <FlatList
            data={data}
            contentContainerClassName="gap-4"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
            onEndReached={() => setSize(size + 1)}
            onEndReachedThreshold={0.4}
            renderItem={({ item }) => (
              <View className="gap-4">
                {item?.map((item) => (
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
