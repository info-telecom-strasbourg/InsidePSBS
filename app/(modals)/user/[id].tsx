import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Profile } from "@/features/profile/profile";
import { useShowUserPosts } from "@/queries/user/user-posts.query";
import { useShowUserProfile } from "@/queries/user/user-profile.query";
import { useLocalSearchParams } from "expo-router";

const UserPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data,
    isLoading,
    isRefreshing,
    handleRefresh: handleRefreshUser,
  } = useShowUserProfile(id);

  const {
    data: posts,
    isLoading: postsAreLoading,
    size,
    setSize,
    hasMore,
    handleRefresh: handleRefreshPosts,
  } = useShowUserPosts(id);

  const handleRefresh = () => {
    handleRefreshUser();
    handleRefreshPosts();
  };
  return (
    <PageContainer>
      <Header title="Profil" leftIcon="back" rightIcon="close" />
      {!data || isLoading || !posts || postsAreLoading ? (
        <PageLoading />
      ) : (
        <Profile
          avatar={data.avatar_url}
          handleRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          posts={posts}
          postsAreLoading={postsAreLoading}
          setSize={setSize}
          size={size}
          subtitle={data.user_name}
          title={`${data.first_name} ${data.last_name}`}
          hasMore={hasMore}
        />
      )}
    </PageContainer>
  );
};

export default UserPage;
