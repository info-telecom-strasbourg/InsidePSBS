import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { CommentInput } from "@/features/posts/comments/comment-input";
import { Comments } from "@/features/posts/comments/comments";
import { Post } from "@/features/posts/post";
import { useComments } from "@/queries/posts/comments.query";
import { useOnePost } from "@/queries/posts/one-post.query";
import { useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, View } from "react-native";

export default function PostIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: postData,
    isLoading: postIsLoading,
    error: postError,
    handleRefresh,
    isRefreshing,
  } = useOnePost(id);

  const {
    data: commentsData,
    isLoading: commentsAreLoading,
    size,
    setSize,
  } = useComments(id);

  return (
    <PageContainer>
      <Header title="Post" rightIcon="close" />
      {!postData || postIsLoading || commentsAreLoading ? (
        <PageLoading />
      ) : (
        <>
          <View className="mb-4">
            <Post
              item={postData}
              authorNameSize="h3"
              postId={postData.id}
              bodySize="p"
              isLoading={postIsLoading}
            />
          </View>
          {postData.reaction_count !== 0 ? (
            <Comments data={commentsData} size={size} setSize={setSize} />
          ) : (
            <View className="items-center justify-center">
              <Typography size="h5">Pas de commentaires</Typography>
            </View>
          )}

          <KeyboardAvoidingView className="my-2 flex-row items-center gap-3 rounded-full bg-popover p-2 pl-4">
            <CommentInput />
          </KeyboardAvoidingView>
        </>
      )}
    </PageContainer>
  );
}
