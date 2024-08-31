import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { RenderPosts } from "@/features/post/render-posts";
import { ProfileHeader } from "@/features/profile/profile-header";
import { useMe } from "@/queries/profile/me.query";
import { useShowUserPosts } from "@/queries/user/user-posts.query";
import type { PostsData } from "@/schemas/post/post.schema";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, View } from "react-native";

export default function ProfilePage() {
  const { data, isLoading, handleRefresh, isRefreshing } = useMe();

  const {
    data: posts,
    isLoading: postsAreLoading,
    size,
    setSize,
    handleRefresh: handleRefreshPosts,
    isRefreshing: arePostsRefreshing,
  } = useShowUserPosts(data?.data.id.toString());

  const items = posts ? posts.flat() : [];

  const loadMore = () => {
    setSize(size + 1);
  };

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="inside-psbs" rightIcon="settings" />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <FlashList<PostsData["data"][0] | undefined>
          data={items}
          ListHeaderComponent={
            <View className="mt-4">
              <ProfileHeader
                avatar={data.data.avatar_url}
                title={`${data.data.first_name} ${data.data.last_name}`}
                subtitle={data.data.user_name}
                posts={posts}
              />
            </View>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={3}
          renderItem={({ item }) => (
            <RenderPosts item={item} postsAreLoading={postsAreLoading} />
          )}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl
              refreshing={arePostsRefreshing}
              onRefresh={handleRefreshPosts}
            />
          }
        />
      )}
    </PageContainer>
  );
}
