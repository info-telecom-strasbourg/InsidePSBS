import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useComments } from "@app/(modals)/post/_features/comments.query";
import { type CommentsData } from "@app/(modals)/post/_features/comments.schema";
import { useOnePost } from "@app/(modals)/post/_features/one-post.query";
import { Post } from "@app/(tabs)/posts/_features/post";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { CircleMinus, CirclePlus } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { memo, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";


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
  } = useComments(id, null);

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
        renderItem={({ item, index }) => (
          <Comment comment={item} key={index} postId={id} levelFromRoot={0} />
        )}
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
  postId,
  levelFromRoot = 0,
}: {
  comment: CommentsData["data"][0] | undefined;
  postId: string;
  levelFromRoot?: number;
}) {
  const { theme } = useTheme();

  const { data: children, isLoading: childrenAreLoading } = useComments(
    postId,
    comment!.id
  );

  const childrenComment = useMemo(
    () => (children ? children.flat() : []),
    [children]
  );
  const [showChildren, setShowChildren] = useState<boolean>(false);

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
          (!childrenComment || childrenAreLoading) && showChildren ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator
                size={30}
                color={colors[theme].mutedForeground}
              />
              <Typography
                size="h5"
                fontWeight="medium"
                className="text-muted-foreground"
              >
                Chargement...
              </Typography>
            </View>
          ) : (
            <TouchableOpacity
              className="flex-row justify-start gap-2 py-2"
              onPress={() => setShowChildren(!showChildren)}
            >
              {showChildren ? (
                <CircleMinus color={colors[theme].mutedForeground} />
              ) : (
                <CirclePlus color={colors[theme].mutedForeground} />
              )}
              <Typography
                size="h5"
                fontWeight="medium"
                className="text-muted-foreground"
              >
                {showChildren ? "Masquer" : "Afficher"} les réponses
              </Typography>
            </TouchableOpacity>
          )
        ) : null}
        <View className={levelFromRoot >= 2 ? "" : "ml-3"}>
          {childrenComment &&
            childrenComment.map((c, i) => (
              <Comment
                key={i}
                comment={c}
                postId={postId}
                levelFromRoot={levelFromRoot + 1}
              />
            ))}
        </View>
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

