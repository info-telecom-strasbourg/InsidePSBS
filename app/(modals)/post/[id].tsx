import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { useComments } from "@app/(modals)/post/_features/comments.query";
import { type CommentsData } from "@app/(modals)/post/_features/comments.schema";
import { useOnePost } from "@app/(modals)/post/_features/one-post.query";
import { Post, SkeletonPost } from "@app/(tabs)/posts/_features/post";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, RefreshControl, View } from "react-native";
import { Comment, SkeletonComment } from "./_features/comment";
import { CommentInput } from "./_features/comment-input";

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

  const [commentToAnswer, setCommentToAnswer] = useState<
    CommentsData["data"][0] | null
  >(null);

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
          <Comment
            comment={item}
            key={index}
            postId={id}
            levelFromRoot={0}
            commentToAnswer={commentToAnswer}
            setCommentToAnswer={setCommentToAnswer}
          />
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
          <>
            <View className="mb-4">
              <SkeletonPost />
            </View>
            <View className="mb-4 gap-4">
              <SkeletonComment />
              <SkeletonComment />
              <SkeletonComment />
              <SkeletonComment />
              <SkeletonComment />
              <SkeletonComment />
            </View>
          </>
        }
      />
      <KeyboardAvoidingView>
        <CommentInput
          postId={id}
          commentToAnswer={commentToAnswer}
          setCommentToAnswer={setCommentToAnswer}
        />
      </KeyboardAvoidingView>
    </PageContainer>
  );
}
