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
import { ScrollView, TouchableOpacity, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

const fetcher = async (url: string, token: string | null) => {
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

const getKey = (pageIndex: number, selectedId: number) => {
  return `${
    process.env.EXPO_PUBLIC_API_URL
  }/api/post?category_id=${selectedId}&per_page=4&page=${pageIndex + 1}`;
};

export default function AnnouncementsPage() {
  const { token } = useAuth();
  const [selectedId, setSelectedId] = useState(1);

  const { data, isLoading, error, size, setSize, isRefreshing, handleRefresh } =
    useFetchInfinite(
      (pageIndex) => getKey(pageIndex, selectedId),
      (url) => fetcher(url, token)
    );

  // TODO: Implémenter les isLoading et les erreurs

  const modalRouter = useModalRouter();

  return (
    <PageContainer>
      <Header title="Publications" rightIcon="settings" />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-3">
            <View className="mb-4 gap-5">
              <Search />
              <Filters selectedId={selectedId} setSelectedId={setSelectedId} />
            </View>
            <FlatList
              className="gap-3"
              data={data}
              scrollEnabled={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
              onEndReached={() => setSize(size + 1)}
              onEndReachedThreshold={0.8}
              renderItem={({ item }) => (
                <>
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
                </>
              )}
            />
          </View>
        </ScrollView>
      )}
    </PageContainer>
  );
}
