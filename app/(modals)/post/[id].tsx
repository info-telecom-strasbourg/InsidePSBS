import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { CommentInput } from "@/features/posts/comments/comment-input";
import { Post } from "@/features/posts/post";
import { useComments } from "@/queries/posts/comments.query";
import { useOnePost } from "@/queries/posts/one-post.query";
import type { CommentsData } from "@/schemas/posts/comments.schema";
import type { SinglePostData } from "@/schemas/posts/post.schema";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { Image, KeyboardAvoidingView, View } from "react-native";

const RenderComments: ListRenderItem<CommentsData["data"][0] | undefined> = ({
  item,
}: {
  item: CommentsData["data"][0] | undefined;
}) => (
  <View className="mb-4 flex-row gap-3">
    <View>
      <Image
        source={{ uri: item?.author.logo_url || undefined }}
        className="size-12 rounded-full"
        resizeMode="contain"
      />
    </View>
    <View className="flex-1 rounded-2xl bg-popover p-3">
      <Typography fontWeight="medium" className="">
        {item?.author.name}
      </Typography>
      <Typography size="p">{item?.body}</Typography>
    </View>
  </View>
);

const HeaderComp = ({
  postIsLoading,
  postData,
}: {
  postIsLoading: boolean;
  postData: SinglePostData["data"] | undefined;
}) => (
  <View className="mb-4">
    <Post isLoading={postIsLoading} item={postData} postId={postData?.id} />
  </View>
);

export default function PostIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: postData, isLoading: postIsLoading } = useOnePost(id);

  const {
    data: commentsData,
    isLoading: commentsAreLoading,
    size,
    setSize,
    isRefreshing: commentsAreRefreshing,
    handleRefresh,
  } = useComments(id);

  const comments = commentsData ? commentsData.flat() : [];

  return (
    <PageContainer>
      <Header title="Post" rightIcon="close" />
      <FlashList<CommentsData["data"][0] | undefined>
        data={comments}
        renderItem={RenderComments}
        estimatedItemSize={200}
        ListHeaderComponent={
          <HeaderComp postIsLoading={postIsLoading} postData={postData} />
        }
      />
      <KeyboardAvoidingView className="my-2 flex-row items-center gap-3 rounded-full bg-popover p-2 pl-4">
        <CommentInput />
      </KeyboardAvoidingView>
    </PageContainer>
  );
}
