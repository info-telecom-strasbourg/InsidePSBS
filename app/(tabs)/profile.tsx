import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { Post } from "@/features/posts/post";
import Hero from "@/features/profile/hero";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useMe } from "@/queries/profiles/me.query";
import { useShowUserPosts } from "@/queries/profiles/profiles-posts.query";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const { data, isLoading, error, handleRefresh, isRefreshing } = useMe();

  const {
    data: posts,
    isLoading: postsAreLoading,
    error: postsError,
  } = useShowUserPosts(data?.id.toString());

  const modalRouter = useModalRouter();

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="inside-psbs" rightIcon="settings" />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <>
          <FlatList
            data={posts}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
            renderItem={({ item }) => (
              <View className="gap-4">
                {item?.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => modalRouter.open(`/post/${item.id}`)}
                  >
                    <Post
                      item={item}
                      interactions
                      isLoading={isLoading}
                      error={postsError}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponentClassName="gap-3"
            ListHeaderComponent={() => (
              <>
                <View className="gap-3">
                  <View className="items-center">
                    <TouchableOpacity className="w-1/2 items-center justify-center rounded-full border-2 border-muted-foreground p-1">
                      <Typography className="text-muted-foreground">
                        Modifier le profil
                      </Typography>
                    </TouchableOpacity>
                  </View>
                  <Hero
                    avatar={data.avatar_url}
                    title={`${data.first_name} ${data.last_name}`}
                    subtitle={data.user_name}
                  />
                  <Typography size="h2">Publications</Typography>
                </View>
              </>
            )}
          />
        </>
      )}
    </PageContainer>
  );
}
