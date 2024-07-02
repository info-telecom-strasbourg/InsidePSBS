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
import { PencilLine } from "lucide-react-native";
import { TextInput, View } from "react-native";

export default function PostIdPage() {
  const { theme } = useTheme();

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
    error: commentsError,
  } = useComments(id);

  return (
    <PageContainer>
      <Header title="Tous les Posts" rightIcon="close" />
      {!postData || postIsLoading || commentsAreLoading ? (
        <PageLoading />
      ) : (
        <RefreshView isRefreshing={isRefreshing} handleRefresh={handleRefresh}>
          <View className="mb-2 border-b-2 border-muted-foreground pb-2">
            <Post
              item={postData}
              authorNameSize="h3"
              bodySize="p"
              isLoading={postIsLoading}
              error={postError}
            />
          </View>
          <View>
            {/* TODO: Implémenter l'avatar de l'utilisateur à côté du champ de commentaire */}
            <View className="mb-4 flex-row items-center gap-3 rounded-2xl bg-popover p-2">
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
            </View>
          </View>
          {commentsData ? (
            <Comments data={commentsData} />
          ) : (
            <View className="justify-center">
              <Typography size="h5">Pas de commentaires</Typography>
            </View>
          )}
        </RefreshView>
      )}
    </PageContainer>
  );
}
