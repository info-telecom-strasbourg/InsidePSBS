import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Profile } from "@/features/profile/profile";
import { useShowOrganization } from "@/queries/organizations/organization-profile.query";
import { useShowOrganizationPosts } from "@/queries/organizations/organizations-posts.query";
import { useLocalSearchParams } from "expo-router";

export default function AssoIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isRefreshing, handleRefresh } =
    useShowOrganization(id);

  const {
    data: posts,
    isLoading: postsAreLoading,
    size,
    setSize,
    hasMore,
  } = useShowOrganizationPosts(id);

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="back" rightIcon="close" />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <Profile
          avatar={data.organization.logo_url}
          handleRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          posts={posts}
          postsAreLoading={postsAreLoading}
          setSize={setSize}
          size={size}
          socials={data.organization}
          members={data.members}
          subtitle={data.organization.name}
          title={data.organization.short_name || data.organization.name}
          hasMore={hasMore}
          description={data.organization.description}
        />
      )}
    </PageContainer>
  );
}
