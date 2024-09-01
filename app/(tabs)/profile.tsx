import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Post } from "@/features/post/post";
import { ProfileHeader } from "@/features/profile/profile-header";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useRefresh } from "@/hooks/useRefresh";
import { useMe } from "@/queries/profile/me.query";
import { useShowUserPosts } from "@/queries/user/user-posts.query";
import type { PostsData } from "@/schemas/post/post.schema";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { RefreshControl, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const modalRouter = useModalRouter();
  const {
    data,
    isLoading,
    handleRefresh: handleRefreshUser,
    isRefreshing: isUserRefreshing,
  } = useMe();
  const {
    data: posts,
    size,
    setSize,
    handleRefresh: handleRefreshPosts,
    isRefreshing: arePostsRefreshing,
    hasMore,
  } = useShowUserPosts(data?.data.id.toString());

  const handleRefresh = useCallback(async () => {
    await handleRefreshUser();
    await handleRefreshPosts();
  }, [handleRefreshUser, handleRefreshPosts]);

  const items = posts ? posts.flat() : [];

  const loadMore = () => {
    if (hasMore) {
      setSize(size + 1);
    }
  };

  useRefresh(handleRefresh);

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
            <TouchableOpacity
              onPress={() => modalRouter.open(`/post/${item?.id}`)}
              className="mb-4"
            >
              <Post item={item} postId={item?.id} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl
              refreshing={arePostsRefreshing || isUserRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </PageContainer>
  );
}
