import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import Profile from "@/features/profile/profile";
import { useMe } from "@/queries/profile/me.query";
import { useShowUserPosts } from "@/queries/user/user-posts.query";

export default function ProfilePage() {
  const { data, isLoading, error, handleRefresh, isRefreshing } = useMe();

  const {
    data: posts,
    isLoading: postsAreLoading,
    error: postsError,
    size,
    setSize,
  } = useShowUserPosts(data?.id.toString() || "");

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="inside-psbs" rightIcon="settings" />
      {!data || isLoading ? (
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
}
