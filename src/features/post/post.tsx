import { ProfilePicture } from "@/components/primitives/profile-picture";
import type { typographyVariants } from "@/components/primitives/typography";
import { Typography } from "@/components/primitives/typography";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useReactionType } from "@/queries/post/one-post.query";
import { PostBodySchema } from "@/schemas/create/event/store-post.schema";
import type { SinglePostData } from "@/schemas/post/post.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { MessageCircle } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { useState, type PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { Media } from "./media";
import { useMediaCarousel } from "./media-carousel.context";
import { PostParser } from "./post-parser";
import { Reaction } from "./reaction";

export type SinglePostProps = PropsWithChildren<
  {
    item: SinglePostData["data"] | undefined;
    className?: string;
    postId: number | undefined;
    authorNameSize?: VariantProps<typeof typographyVariants>["size"];
    dateSize?: VariantProps<typeof typographyVariants>["size"];
    bodySize?: VariantProps<typeof typographyVariants>["size"];
  } & ViewProps
>;

export const Post = ({
  item,
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

  const { updateMediaCarousel } = useMediaCarousel();

  const handleMediaPress = () => {
    if (item) {
      updateMediaCarousel("medias", item.medias);
      updateMediaCarousel("isMediaCarouselOpen", true);
    }
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
      </View>

      <PostParser
        data={PostBodySchema.safeParse(JSON.parse(item?.body || "")).data}
      />
      {item.medias[0] ? (
        <View className="mt-3 flex-row items-center justify-between rounded-2xl">
          {item.medias.length === 1 ? (
            <TouchableOpacity
              onPress={() => handleMediaPress()}
              className="flex-1"
            >
              <Media
                media={item.medias[0]}
                className="h-64 w-full rounded-2xl"
              />
            </TouchableOpacity>
          ) : (
            <View
              className="flex-row overflow-hidden rounded-2xl"
              style={{ gap: 4 }}
            >
              <TouchableOpacity
                onPress={() => handleMediaPress()}
                className="h-64 flex-1"
              >
                <Media media={item.medias[0]} className="h-full" />
              </TouchableOpacity>

              <TouchableOpacity
                className="h-64 flex-1 items-center justify-center bg-background opacity-50"
                onPress={() => handleMediaPress()}
              >
                <Typography size="h1" className="text-center" fontWeight="bold">
                  +{item.medias.length - 1}
                </Typography>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : null}

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