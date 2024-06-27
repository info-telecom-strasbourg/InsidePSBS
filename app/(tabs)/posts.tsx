import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import { Filters } from "@/features/posts/filters";
import { Post } from "@/features/posts/post";
import { Search } from "@/features/posts/search";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import { useModalRouter } from "@/hooks/useModalRouter";
import { PostsSchema } from "@/schemas/post.schema";
import { useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = PostsSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data.data;
};

const getKey = (
  pageIndex: number,
  selectedId: number,
  searchPhrase: string
) => {
  return `${
    process.env.EXPO_PUBLIC_API_URL
  }/api/post?category_id=${selectedId}&search=${searchPhrase}&per_page=10&page=${
    pageIndex + 1
  }`;
};

export default function AnnouncementsPage() {
  const { token } = useAuth();
  const [selectedId, setSelectedId] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");

  const { data, isLoading, error, size, setSize, isRefreshing, handleRefresh } =
    useFetchInfinite(
      (pageIndex) => getKey(pageIndex, selectedId, searchPhrase),
      (url) => fetcher(url, token || "")
    );

  // TODO: Implémenter les erreurs

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
            ListFooterComponentClassName="mb-4"
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
                {item.map((item) => (
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
