import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { Post } from "@/features/posts/post";
import { useComments } from "@/queries/posts/comments.query";
import { useOnePost } from "@/queries/posts/one-post.query";
import type { CommentsData } from "@/schemas/posts/comments.schema";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { Image, View } from "react-native";

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

  const renderComments: ListRenderItem<CommentsData["data"][0] | undefined> = ({
    item,
  }) => (
    <View className="flex-row gap-3">
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

  const headerComp = () => (
    <View className="mb-4">
      <Post isLoading={postIsLoading} item={postData} postId={postData?.id} />
    </View>
  );

  return (
    <PageContainer>
      <Header title="Post" rightIcon="close" />
      <FlashList<CommentsData["data"][0] | undefined>
        data={comments}
        renderItem={renderComments}
        ListHeaderComponent={headerComp}
        estimatedItemSize={200}
      />
      {/* <KeyboardAvoidingView className="my-2 flex-row items-center gap-3 rounded-full bg-popover p-2 pl-4">
        <CommentInput />
      </KeyboardAvoidingView> */}
    </PageContainer>
  );
}
