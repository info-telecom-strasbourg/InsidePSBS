import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useShowUserPosts } from "@app/(modals)/user/_features/user-posts.query";
import type { PostsData } from "@app/(tabs)/posts/_features/post.schema";
import { useMe } from "@app/(tabs)/profile/_features/me.query";
import { ProfileHeader } from "@app/(tabs)/profile/_features/profile-header";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, TouchableOpacity, View } from "react-native";
import { Post } from "../posts/_features/post";

export default function ProfilePage() {
  const modalRouter = useModalRouter();
  const { data, isLoading, handleRefresh, isRefreshing } = useMe();
  const modalRouter = useModalRouter();
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
              refreshing={arePostsRefreshing}
              onRefresh={handleRefreshPosts}
            />
          }
        />
      )}
    </PageContainer>
  );
}
