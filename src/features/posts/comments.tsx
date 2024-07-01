import { useAuth } from "@/auth/useAuth";
import { Typography } from "@/components/primitives/typography";
import { useFetch } from "@/hooks/useFetch";
import type { CommentsData } from "@/schemas/posts/comments.schema";
import { CommentsSchema } from "@/schemas/posts/comments.schema";
import { useLocalSearchParams } from "expo-router";
import type { PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { Image, View } from "react-native";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = CommentsSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data.data;
};

export const useComments = () => {
  const local = useLocalSearchParams();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${local.id}/comment?per_page=10&page=1`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};

export type CommentsProps = PropsWithChildren<
  {
    data: CommentsData["data"];
    isLoading: boolean;
    error: string | null;
  } & ViewProps
>;

export const Comments = ({ data, isLoading, error }: CommentsProps) => {
  return (
    //!data || isLoading ? (
    //   <PageLoading />
    // ) : (
    <View>
      <View className="gap-4">
        {data.map((comment) => (
          <View key={comment.id} className="flex-row gap-3">
            <View>
              <Image
                source={{ uri: comment.author.logo_url || undefined }}
                className="size-12 rounded-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1 rounded-2xl bg-popover p-3">
              <Typography fontWeight="medium" className="">
                {comment.author.name}
              </Typography>
              <Typography size="p">{comment.body}</Typography>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
