import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import Profile from "@/features/profile/profile";
import { useMe } from "@/queries/profile/me.query";
import { useShowUserPosts } from "@/queries/user/user-posts.query";

export default function ProfilePage() {
  const { data, isLoading, handleRefresh, isRefreshing } = useMe();

  const {
    data: posts,
    isLoading: postsAreLoading,
    size,
    setSize,
  } = useShowUserPosts(data?.data.id.toString());

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="inside-psbs" rightIcon="notifications" />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <Profile
          avatar={data.data.avatar_url || undefined}
          handleRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          posts={posts}
          postsAreLoading={postsAreLoading}
          setSize={setSize}
          size={size}
          subtitle={data.data.user_name}
          title={`${data.data.first_name} ${data.data.last_name}`}
        />
      )}
    </PageContainer>
  );
}
