import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import { Filters } from "@/features/posts/filters";
import { Post } from "@/features/posts/post";
import { Search } from "@/features/posts/search";
import { useFetch } from "@/hooks/useFetch";
import { useModalRouter } from "@/hooks/useModalRouter";
import { PostsSchema } from "@/schemas/post.schema";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

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

export default function AnnouncementsPage() {
  const [selectedId, setSelectedId] = useState(1);

  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post?per_page=10&page=1`;
  const { token } = useAuth();
  const { data, isLoading, error, isRefreshing, handleRefresh } = useFetch(
    url,
    (url: string) => fetcher(url, token)
  );

  // TODO: Implémenter les isLoading et les erreurs

  const modalRouter = useModalRouter();

  return !data || isLoading ? (
    <>
      <Header title="Publications" rightIcon="settings" />
      <PageLoading />
    </>
  ) : (
    <PageContainer>
      <Header title="Publications" rightIcon="settings" />
      <RefreshView
        handleRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          <View className="mb-6 gap-5">
            <Search />
            <Filters selectedId={selectedId} setSelectedId={setSelectedId} />
          </View>
          {data.map((item) => (
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
      </RefreshView>
    </PageContainer>
  );
}
