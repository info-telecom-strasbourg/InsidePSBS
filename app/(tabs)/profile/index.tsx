import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import type { PostsData } from "@app/(tabs)/posts/_features/fetch/post.schema";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { RenderPosts } from "../posts";
import { useMe } from "./_features/fetch/me.query";
import { useShowUserPosts } from "./_features/fetch/user-posts.query";
import { ProfileHeader } from "./_features/profile-header";

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
      <Header title="Profil" leftIcon="inside-psbs" rightIcon="notifications" />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <FlashList<PostsData["data"][0] | undefined>
          data={items}
          ListHeaderComponent={
            <ProfileHeader
              avatar={data.data.avatar_url}
              title={`${data.data.first_name} ${data.data.last_name}`}
              subtitle={data.data.user_name}
              posts={posts}
            />
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
