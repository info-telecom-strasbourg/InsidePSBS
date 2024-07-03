import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import type { typographyVariants } from "@/components/primitives/typography";
import { Typography } from "@/components/primitives/typography";
import { useModalRouter } from "@/hooks/useModalRouter";
import { type SinglePostData } from "@/schemas/posts/post.schema";
import type { AddReactionOnPostData } from "@/schemas/posts/reactions/add-reaction.schema";
import { AddReactionOnPostSchema } from "@/schemas/posts/reactions/add-reaction.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { postQuery } from "@/utils/post-query";
import type { VariantProps } from "class-variance-authority";
import { Heart, MessageCircle } from "lucide-react-native";
import type { PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";

export type SinglePostProps = PropsWithChildren<
  {
    item: SinglePostData["data"] | undefined;
    isLoading: boolean;
    error?: string | null;
    interactions?: boolean;
    className?: string;
    postId: number;
    authorNameSize?: VariantProps<typeof typographyVariants>["size"];
    dateSize?: VariantProps<typeof typographyVariants>["size"];
    bodySize?: VariantProps<typeof typographyVariants>["size"];
    handleRefresh: () => void;
  } & ViewProps
>;

const reactions = {
  like: "👍",
  dislike: "👎",
  love: "❤️",
  laugh: "😂",
  cry: "😭",
  angry: "🤬",
};

export const Post = ({
  item,
  isLoading,
  interactions,
  error,
  className,
  postId,
  authorNameSize = "h4",
  dateSize = "h5",
  bodySize = "h5",
  handleRefresh,
}: SinglePostProps) => {
  const { theme } = useTheme();
  const modalRouter = useModalRouter();
  const { token } = useAuth();

  const reaction = item?.has_reacted as keyof typeof reactions | undefined;

  return !item || isLoading ? (
    <PageLoading />
  ) : (
    <View
      className={cn("justify-between rounded-2xl bg-popover p-4", className)}
    >
      <View className="flex-row items-center justify-start">
        <TouchableOpacity
          onPress={() =>
            item.author.is_organization
              ? modalRouter.open(`/organizations/${item.author.id}`)
              : modalRouter.open(`/user/${item.author.id}`)
          }
        >
          <Image
            source={{ uri: item.author.logo_url || undefined }}
            className="size-20"
          />
        </TouchableOpacity>
        <View className="ml-2 flex-col">
          <Typography size={authorNameSize} fontWeight="semibold">
            {item.author.name}
          </Typography>
          <Typography
            size={dateSize}
            fontWeight="medium"
            className="text-muted-foreground"
          >
            {item.uploaded_since}
          </Typography>
        </View>
      </View>
      <Typography size={bodySize}>{item.body}</Typography>
      <View className="mt-3 flex-row items-center gap-4">
        <TouchableOpacity
          className="p-1"
          onPress={async () => {
            const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${postId}/reaction`;
            await postQuery<AddReactionOnPostData>(
              url,
              token,
              { reaction_type_id: 3, post_id: postId },
              AddReactionOnPostSchema
            );
            handleRefresh();
          }}
        >
          <View className="flex-row items-center gap-2">
            {reaction ? (
              <Typography size="h1">{reactions[reaction]}</Typography>
            ) : (
              <Heart
                strokeWidth={1.5}
                size={30}
                color={colors[theme].foreground}
              />
            )}
            <Typography size="p">{item.reaction_count}</Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <MessageCircle
              strokeWidth={1.5}
              color={colors[theme].foreground}
              size={30}
            />
            <Typography size="p">{item.comment_count}</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
