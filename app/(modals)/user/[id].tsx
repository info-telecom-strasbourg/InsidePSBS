import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { useShowUserPosts } from "@app/(modals)/user/_features/user-posts.query";
import { useShowUserProfile } from "@app/(modals)/user/_features/user-profile.query";
import { Profile } from "@app/(tabs)/profile/_features/profile";
import { useLocalSearchParams } from "expo-router";

const UserPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isRefreshing, handleRefresh } =
    useShowUserProfile(id);

  const {
    data: posts,
    isLoading: postsAreLoading,
    size,
    setSize,
  } = useShowUserPosts(id);

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="back" rightIcon="close" />
      {!data || isLoading || !posts || postsAreLoading ? (
        <PageLoading />
      ) : (
        <Profile
          avatar={data.avatar_url || undefined}
          handleRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          posts={posts}
          postsAreLoading={postsAreLoading}
          setSize={setSize}
          size={size}
          subtitle={data.user_name}
          title={`${data.first_name} ${data.last_name}`}
        />
      )}
    </PageContainer>
  );
};

export default UserPage;
