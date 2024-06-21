import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import SinglePost from "@/features/posts/single-post";
import { useFetch } from "@/hooks/useFetch";
import { SinglePostSchema } from "@/schemas/post.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useLocalSearchParams } from "expo-router";
import { PencilLine } from "lucide-react-native";
import { ScrollView, TextInput, View } from "react-native";

const Comments = () => {
  const local = useLocalSearchParams();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${local.id}/comment`;
  const { theme } = useTheme();

  const fetcher = async () => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const parsedData = SinglePostSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error(parsedData.error.message);
    }
    return data.data;
  };

  const { data, isLoading, handleRefresh, isRefreshing } = useFetch(
    url,
    fetcher
  );

  // return !data || isLoading ? (
  //   <PageLoading />
  // ) :
  return (
    <View className="mb-6 flex-row items-center justify-start gap-3 rounded-2xl bg-popover p-2 pl-4">
      <PencilLine
        strokeWidth={1.5}
        color={colors[theme].mutedForeground}
        size={24}
      />
      <TextInput
        // value={searchPhrase}
        // onChangeText={(searchPhrase) => setSearchPhrase(searchPhrase)}
        className="flex-1 rounded-2xl p-2 text-foreground"
        placeholder="Écrivez un commentaire"
        placeholderTextColor={colors[theme].mutedForeground}
        style={{ fontFamily: "SpaceGrotesk-medium" }}
      />
    </View>
  );
};

const PostView = () => {
  const local = useLocalSearchParams();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${local.id}`;
  const { token } = useAuth();

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = SinglePostSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error(parsedData.error.message);
    }
    return data.data;
  };

  const { data, isLoading, isRefreshing, handleRefresh } = useFetch(
    url,
    fetcher
  );

  return !data || isLoading ? (
    <PageLoading />
  ) : (
    <PageContainer className="bg-background">
      <Header title="Tous les Posts" leftIcon="back" />
      <ScrollView>
        <RefreshView isRefreshing={isRefreshing} handleRefresh={handleRefresh}>
          <View className="mb-2 border-b-2 border-muted-foreground pb-2">
            <SinglePost item={data} authorNameSize="h2" bodySize="h4" />
          </View>
          <Comments />
        </RefreshView>
      </ScrollView>
    </PageContainer>
  );
};

export default PostView;
