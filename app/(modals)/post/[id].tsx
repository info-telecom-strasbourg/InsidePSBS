import { useAuth } from "@/auth/useAuth";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { SinglePostSchema } from "@/schemas/single-post.schema";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";

const Post = () => {
  const local = useLocalSearchParams();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${local?.id}`;
  const { token } = useAuth();

  const fetcher = async () => {
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

  const { data } = useFetch(url, fetcher);
  return (
    <View className="border-b">
      <Header title="Posts" leftIcon="back" />
      <View className="bg flex-1">
        <View className="flex-1 flex-row items-center justify-start gap-3">
          <Image
            source={{ uri: `${data?.author.logo_url}` }}
            className="size-20 rounded-full"
            style={{ resizeMode: "cover" }}
          />
          <Typography size="h2" className="text-foreground">
            {data?.author.name}
          </Typography>
        </View>
        <View className="flex-1 items-center">
          <Typography size="h4" className="">
            {data?.body}
          </Typography>
        </View>
      </View>
    </View>
  );
};

const Comments = () => {
  const local = useLocalSearchParams();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${local?.id}/comment`;

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

  const { data } = useFetch(url, fetcher);

  return (
    <View className="flex-1 items-center justify-center">
      <Typography size="h5" className="text-center">
        a
      </Typography>
    </View>
  );
};

const PostView = () => {
  return (
    <PageContainer className="bg-background">
      <ScrollView>
        <Post />
        <Comments />
      </ScrollView>
    </PageContainer>
  );
};

export default PostView;
