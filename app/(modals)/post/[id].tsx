import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { Comments } from "@/features/posts/comments";
import { Post } from "@/features/posts/post";
import { useComments } from "@/queries/posts/comments.query";
import { useOnePost } from "@/queries/posts/one-post.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useLocalSearchParams } from "expo-router";
import { ArrowUp, PencilLine } from "lucide-react-native";
import { KeyboardAvoidingView, TextInput, View } from "react-native";

export default function PostIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();

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
    error: commentsError,
    size,
    setSize,
  } = useComments(id);

  return (
    <PageContainer>
      <Header title="Tous les Posts" rightIcon="close" />
      {!postData || postIsLoading || commentsAreLoading ? (
        <PageLoading />
      ) : (
        <>
          <RefreshView
            isRefreshing={isRefreshing}
            handleRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
          >
            <View className="mb-4 ">
              <Post
                item={postData}
                authorNameSize="h3"
                bodySize="p"
                isLoading={postIsLoading}
                error={postError}
              />
            </View>
            {postData.reaction_count !== 0 ? (
              <Comments data={commentsData} size={size} setSize={setSize} />
            ) : (
              <View className="items-center justify-center">
                <Typography size="h5">Pas de commentaires</Typography>
              </View>
            )}
          </RefreshView>
          <KeyboardAvoidingView className="my-2 flex-row items-center gap-3 rounded-full bg-popover p-2 pl-4">
            <PencilLine
              strokeWidth={1.5}
              color={colors[theme].mutedForeground}
              size={24}
            />
            <TextInput
              // value={searchPhrase}
              // onChangeText={(searchPhrase) => setSearchPhrase(searchPhrase)}
              className="flex-1 rounded-2xl p-2 text-foreground"
              placeholder="Écrivez un commentaire"
              placeholderTextColor={colors[theme].mutedForeground}
              style={{ fontFamily: "SpaceGrotesk-medium" }}
            />
            <View className="mr-2 rounded-full bg-primary p-2">
              <ArrowUp
                strokeWidth={2}
                color={colors[theme].primaryForeground}
                size={24}
              />
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </PageContainer>
  );
}
