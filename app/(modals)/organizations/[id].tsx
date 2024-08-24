import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { useShowOrganization } from "@app/(modals)/organizations/_features/organization-profile.query";
import { useShowOrganizationPosts } from "@app/(modals)/organizations/_features/organizations-posts.query";
import { Profile } from "@app/(tabs)/profile/_features/profile";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function AssoIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isRefreshing, handleRefresh } =
    useShowOrganization(id);

  const {
    data: posts,
    isLoading: postsAreLoading,
    error: postsError,
    size,
    setSize,
  } = useShowOrganizationPosts(id);

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="back" rightIcon="close" />
      {!data || isLoading ? (
        <ActivityIndicator />
      ) : (
        <Profile
          avatar={data?.organization.logo_url}
          handleRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          posts={posts}
          postsAreLoading={postsAreLoading}
          setSize={setSize}
          size={size}
          socials={data?.organization}
          members={data?.members}
          subtitle={data?.organization.name}
          title={data?.organization.short_name}
        />
      )}
    </PageContainer>
  );
}
