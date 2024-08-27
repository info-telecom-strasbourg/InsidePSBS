import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useComments } from "@app/(modals)/post/_features/comments.query";
import type { CommentsData } from "@app/(modals)/post/_features/comments.schema";
import { useOnePost } from "@app/(modals)/post/_features/one-post.query";
import { Post } from "@app/(tabs)/posts/_features/post";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { memo, useMemo, useState } from "react";
import { RefreshControl, TouchableOpacity, View } from "react-native";

export default function PostIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: postData, isLoading: postIsLoading } = useOnePost(id);

  const {
    data: commentsData,
    isRefreshing: commentsAreRefreshing,
    handleRefresh: handleCommentsRefresh,
    size,
    setSize,
    hasMore,
  } = useComments(id);

  const comments = useMemo(
    () => (commentsData ? commentsData.flat() : []),
    [commentsData]
  );

  const loadMore = () => {
    if (hasMore) {
      setSize(size + 1);
    }
  };

  return (
    <PageContainer>
      <Header title="Post" rightIcon="close" />

      <FlashList<CommentsData["data"][0] | undefined>
        data={comments}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        renderItem={({ item, index }) => <Comment comment={item} key={index} />}
        refreshControl={
          <RefreshControl
            refreshing={commentsAreRefreshing}
            onRefresh={handleCommentsRefresh}
          />
        }
        ListHeaderComponent={
          <View className="mb-4">
            <Post
              isLoading={postIsLoading}
              item={postData}
              postId={postData?.id}
            />
          </View>
        }
        ListEmptyComponent={
          <View className="mb-4 gap-4">
            <SkeletonComment />
            <SkeletonComment />
            <SkeletonComment />
            <SkeletonComment />
            <SkeletonComment />
            <SkeletonComment />
          </View>
        }
      />
    </PageContainer>
  );
}

export const Comment = memo(function Comment({
  comment,
}: {
  comment: CommentsData["data"][0] | undefined;
}) {
  const { theme } = useTheme();

  const [childrenComment, setChildrenComment] = useState<
    CommentsData["data"][0][] | null
  >(null);

  if (!comment) return null;
  return (
    <View className="mb-4 flex-row gap-2">
      <View className="mt-1">
        <ProfilePicture
          avatar={comment?.author.logo_url}
          imageSize={35}
          color={colors[theme].popover}
          isOrganization={comment.author.is_organization}
          name={comment.author.name}
        />
      </View>
      <View className="flex-1">
        <View className="gap-3 rounded-2xl bg-popover p-3">
          <View className="flex-row justify-between">
            <Typography fontWeight="medium" size="h4">
              {comment?.author.name}
            </Typography>
            <Typography className="text-muted-foreground" size="p">
              {comment.created_since}
            </Typography>
          </View>
          <Typography size="p">{comment?.body}</Typography>
        </View>
        {comment?.children_count && comment.children_count > 0 ? (
          <TouchableOpacity className="flex-row justify-start gap-2 py-2">
            <CirclePlus color={colors[theme].mutedForeground} />
            <Typography
              size="h5"
              fontWeight="medium"
              className="text-muted-foreground"
            >
              Voir les réponses
            </Typography>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
});

export const SkeletonComment = () => {
  const { theme } = useTheme();
  return (
    <Skeleton.Group show={true}>
      <View className="flex-row gap-3">
        <Skeleton radius="round" colorMode={theme} width={35} height={35} />
        <View className="flex-1">
          <View className="justify-center gap-2 rounded-2xl bg-popover p-4">
            <Skeleton colorMode={theme} width={150} />
            <Skeleton colorMode={theme} height={50} width={"100%"} />
          </View>
        </View>
      </View>
    </Skeleton.Group>
  );
};
