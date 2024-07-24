import { useAuth } from "@/auth/useAuth";
import { ProfilePicture } from "@/components/primitives/profile-picture";
import type { typographyVariants } from "@/components/primitives/typography";
import { Typography } from "@/components/primitives/typography";
import { useModalRouter } from "@/hooks/useModalRouter";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { postQuery } from "@/utils/post-query";
import { PostBodySchema } from "@app/(modals)/create/post/_features/fetch/store-post.schema";
import {
  AddReactionOnPostSchema,
  type AddReactionOnPostData,
} from "@app/(modals)/post/_features/fetch/add-reaction.schema";
import { useReactionType } from "@app/(modals)/post/_features/fetch/one-post.query";
import type { VariantProps } from "class-variance-authority";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Heart, MessageCircle } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState, type PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";
import type { SinglePostData } from "./fetch/post.schema";
import { PostParser } from "./post-parser";

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

const generateThumbnail = async ({ mediaURL }: { mediaURL: string }) => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(mediaURL, {
      time: 3000,
      quality: 1,
    });
    return uri;
  } catch (e) {
    console.warn(e);
  }
};

const MediaElement = ({
  media,
}: {
  media: SinglePostData["data"]["medias"][0];
}) => {
  const [thumbnailUri, setThumbnailUri] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchThumbnail = async () => {
      if (media.type === "video") {
        const uri = await generateThumbnail({ mediaURL: media.url });
        setThumbnailUri(uri);
      }
    };

    fetchThumbnail();
  }, [media]);

  if (media.type === "image" || thumbnailUri) {
    const uri = media.type === "image" ? media.url : thumbnailUri;
    return (
      <Image source={{ uri }} resizeMode="cover" className="h-28 w-full" />
    );
  }

  return null;
};

export const Post = ({
  item,
  isLoading,
  className,
  postId,
  authorNameSize = "h4",
  dateSize = "h5",
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

  if (!item) return null;
  return (
    <View
      className={cn(
        "justify-between rounded-2xl bg-popover p-4 shadow-md",
        className
      )}
    >
      <View className="mb-2 flex-row items-center justify-start gap-2">
        <TouchableOpacity
          onPress={() =>
            item?.author.is_organization
              ? modalRouter.open(`/organizations/${item.author.id}`)
              : modalRouter.open(`/user/${item?.author.id}`)
          }
        >
          {/* <Image
            source={{ uri: item?.author.logo_url || undefined }}
            className="size-20 rounded-full"
            resizeMode="cover"
          /> */}
          <ProfilePicture
            avatar={item.author.logo_url}
            imageSize={60}
            isOrganization={item.author.is_organization}
            name={item.author.name}
          />
        </TouchableOpacity>
        <View className="ml-2 flex-col">
          <>
            <Typography size={authorNameSize} fontWeight="semibold">
              {item?.author.name}
            </Typography>
            <Typography
              size={dateSize}
              fontWeight="medium"
              className="text-muted-foreground"
            >
              {item?.uploaded_since}
            </Typography>
          </>
        </View>
      </View>

      <PostParser
        data={PostBodySchema.safeParse(JSON.parse(item?.body || "")).data}
      />
      {/* <View className="mt-4 flex-row flex-wrap items-center justify-start rounded-2xl">
        {item?.medias
          ? item.medias.map((media, index) => {
              return (
                <View key={index} style={{ width: "50%" }}>
                  <MediaElement key={index} media={media} />
                </View>
              );
            })
          : null}
      </View> */}

      <View className="relative mt-3 flex-row items-center">
        {reactionsVisible ? (
          <View className="absolute -left-3 -top-20 flex-row items-center justify-center gap-4 rounded-2xl border-2 border-muted bg-popover p-3">
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
        ) : null}
        <TouchableOpacity
          onPress={
            () => (reaction ? storeReaction(reaction.id) : storeReaction(1)) // 1 is the ID for the heart reaction, the default one
          }
          onLongPress={() => setReactionsVisible(true)}
          delayLongPress={200}
        >
          <View className="flex-row items-center gap-2 pr-4">
            <>
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
            </>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <>
              <MessageCircle
                strokeWidth={1.5}
                color={colors[theme].foreground}
                size={30}
              />
              <Typography size="p">{item?.comment_count}</Typography>
            </>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SkeletonPost = () => {
  const { theme } = useTheme();
  return (
    <View className={"justify-between rounded-2xl bg-popover p-4 shadow-md"}>
      <Skeleton.Group show={true}>
        <>
          <View className="mb-4 flex-row items-center justify-start gap-2">
            <Skeleton colorMode={theme} radius="round">
              <View className="size-20 rounded-full"></View>
            </Skeleton>
            <View className="ml-2 flex-col">
              <Skeleton colorMode={theme}>
                <>
                  <Typography fontWeight="semibold">Placeholder</Typography>
                  <Typography
                    fontWeight="medium"
                    className="text-muted-foreground"
                  >
                    Placeholder
                  </Typography>
                </>
              </Skeleton>
            </View>
          </View>
          <Skeleton colorMode={theme} width={"100%"}>
            <Typography>Placeholder</Typography>
          </Skeleton>
        </>
      </Skeleton.Group>
    </View>
  );
};
