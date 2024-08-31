import { ProfilePicture } from "@/components/primitives/profile-picture";
import type { typographyVariants } from "@/components/primitives/typography";
import { Typography } from "@/components/primitives/typography";
import { useModalRouter } from "@/hooks/useModalRouter";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { PostBodySchema } from "@app/(modals)/create/post/step2/_features/store-post.schema";
import { useReactionType } from "@app/(modals)/post/_features/one-post.query";
import type { VariantProps } from "class-variance-authority";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Ellipsis, Heart, MessageCircle } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { ViewProps } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";
import { PostParser } from "./post-parser";
import type { SinglePostData } from "./post.schema";
import { Reaction } from "./reaction";

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

  const { data: reactions } = useReactionType();

  const [reactionCount, setReactionCount] = useState<number | null | undefined>(
    item?.reaction_count
  );

  const [reaction, setReaction] = useState<
    { id: number; icon: string } | null | undefined
  >(item?.reaction);

  const [reactionsVisible, setReactionsVisible] = useState<boolean>(false);


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
          <ProfilePicture
            avatar={item.author.logo_url}
            imageSize={60}
            isOrganization={item.author.is_organization}
            name={item.author.name}
            color={colors[theme].background}
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
        <TouchableOpacity className="mr-2 bg-red">
          <Ellipsis size={30} color={colors[theme].foreground} />
        </TouchableOpacity>
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
        <Reaction
          allReactions={reactions}
          postId={postId}
          reaction={reaction}
          reactionCount={reactionCount}
          reactionsVisible={reactionsVisible}
          setReaction={setReaction}
          setReactionCount={setReactionCount}
          setReactionsVisible={setReactionsVisible}
        />
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
