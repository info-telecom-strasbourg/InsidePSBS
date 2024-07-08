import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import type { typographyVariants } from "@/components/primitives/typography";
import { Typography } from "@/components/primitives/typography";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useReactionType } from "@/queries/posts/one-post.query";
import { type SinglePostData } from "@/schemas/posts/post.schema";
import {
  AddReactionOnPostSchema,
  type AddReactionOnPostData,
} from "@/schemas/posts/reactions/add-reaction.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { postQuery } from "@/utils/post-query";
import type { VariantProps } from "class-variance-authority";
import { Heart, MessageCircle } from "lucide-react-native";
import { useState, type PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";

export type SinglePostProps = PropsWithChildren<
  {
    item: SinglePostData["data"] | undefined;
    isLoading: boolean;
    className?: string;
    postId: number | undefined;
    authorNameSize?: VariantProps<typeof typographyVariants>["size"];
    dateSize?: VariantProps<typeof typographyVariants>["size"];
    bodySize?: VariantProps<typeof typographyVariants>["size"];
  } & ViewProps
>;

export const Post = ({
  item,
  isLoading,
  className,
  postId,
  authorNameSize = "h4",
  dateSize = "h5",
  bodySize = "h5",
}: SinglePostProps) => {
  const { theme } = useTheme();
  const modalRouter = useModalRouter();
  const { token } = useAuth();

  const { data: reactions } = useReactionType();

  const [reactionCount, setReactionCount] = useState<number | null | undefined>(
    item?.reaction_count
  );

  const [reaction, setReaction] = useState<
    { id: number; icon: string } | null | undefined
  >(item?.reaction);

  const [reactionsVisible, setReactionsVisible] = useState<boolean>(false);

  const storeReaction = async (reactionTypeId: number) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${postId}/reaction`;
    const response = await postQuery<AddReactionOnPostData>(
      url,
      token,
      { reaction_type_id: reactionTypeId },
      AddReactionOnPostSchema
    );
    setReaction(response.data.reaction);
    setReactionCount(response.data.reaction_count);
  };

  return !item || isLoading ? (
    <PageLoading />
  ) : (
    <View
      className={cn(
        "justify-between rounded-2xl bg-popover p-4 shadow-md",
        className
      )}
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
      <View className="relative mt-3 flex-row items-center">
        {reactionsVisible && (
          <View className="flex-row gap-4 bg-popover">
            {reactions?.map((r, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    storeReaction(r.id);
                    setReactionsVisible(false);
                  }}
                >
                  <Typography size="h2">{r.icon}</Typography>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <TouchableOpacity
          onPress={() =>
            reaction ? storeReaction(reaction.id) : storeReaction(1)
          }
          onLongPress={() => setReactionsVisible(true)}
          delayLongPress={200}
        >
          <View className="flex-row items-center gap-2 pr-4">
            {reaction ? (
              <Typography size="h2">{reaction.icon}</Typography>
            ) : (
              <Heart
                strokeWidth={1.5}
                color={colors[theme].foreground}
                size={30}
              />
            )}
            <Typography size="p">{reactionCount}</Typography>
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
