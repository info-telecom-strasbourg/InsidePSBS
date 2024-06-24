import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import type { typographyVariants } from "@/components/primitives/typography";
import { Typography } from "@/components/primitives/typography";
import { useFetch } from "@/hooks/useFetch";
import { SinglePostSchema, type SinglePostData } from "@/schemas/post.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { useLocalSearchParams } from "expo-router";
import { Heart, MessageCircle } from "lucide-react-native";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import type { ViewProps } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";

export type SinglePostProps = PropsWithChildren<
  {
    item: SinglePostData["data"];
    isLoading: boolean;
    error: string | null;
    interactions?: boolean;
    className?: string;
    authorNameSize?: VariantProps<typeof typographyVariants>["size"];
    dateSize?: VariantProps<typeof typographyVariants>["size"];
    bodySize?: VariantProps<typeof typographyVariants>["size"];
  } & ViewProps
>;

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
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
  return parsedData.data.data;
};

export const usePost = () => {
  const local = useLocalSearchParams();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${local.id}`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};

export const Post = ({
  item,
  isLoading,
  interactions,
  error,
  className,
  authorNameSize = "h4",
  dateSize = "h5",
  bodySize = "h5",
}: SinglePostProps) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const { theme } = useTheme();
  return !item || isLoading ? (
    <PageLoading />
  ) : (
    <View
      className={cn("justify-between rounded-2xl bg-popover p-4", className)}
    >
      <View className="flex-row items-center justify-start">
        <Image
          source={{ uri: item.author.logo_url || undefined }}
          className="size-20"
        />
        <View className="ml-2 flex-col">
          <Typography size={authorNameSize} fontWeight="semibold">
            {item.author.name}
          </Typography>
          <Typography
            size={dateSize}
            fontWeight="medium"
            className="text-muted-foreground"
          >
            {item.created_since}
          </Typography>
        </View>
      </View>
      <Typography size={bodySize}>{item.body}</Typography>
      {interactions && (
        <View className="mt-3 flex-row items-center gap-4">
          <TouchableOpacity
            className="p-1"
            onPress={() => {
              setHeartClicked(!heartClicked);
            }}
          >
            <Heart
              strokeWidth={1.5}
              color={heartClicked ? colors.red : colors[theme].foreground}
              size={24}
              fill={heartClicked ? colors.red : colors[theme].popover}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MessageCircle
              strokeWidth={1.5}
              color={colors[theme].foreground}
              size={24}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
