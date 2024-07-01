import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import Members from "@/features/organizations/members";
import { Post } from "@/features/posts/post";
import Hero from "@/features/profile/hero";
import { Socials } from "@/features/profile/socials";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useShowOrganization } from "@/queries/organizations/organization-profile.query";
import { useShowOrganizationPosts } from "@/queries/organizations/organizations-posts.query";
import { useLocalSearchParams } from "expo-router";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";

export default function AssoIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isRefreshing, handleRefresh } =
    useShowOrganization(id);

  const {
    data: posts,
    isLoading: postsAreLoading,
    error: postsError,
  } = useShowOrganizationPosts(id);

  const modalRouter = useModalRouter();

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="back" rightIcon="close" />
      {!data || isLoading || !posts || postsAreLoading ? (
        <PageLoading />
      ) : (
        <View className="gap-4">
          <FlatList
            data={posts}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
            renderItem={({ item }) => (
              <View className="gap-4">
                {item?.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => modalRouter.open(`/post/${item.id}`)}
                  >
                    <Post
                      item={item}
                      interactions
                      isLoading={isLoading}
                      error={postsError}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponentClassName="gap-3"
            ListHeaderComponent={() => (
              <>
                <Hero
                  avatar={data.organization.logo_url}
                  title={data.organization.short_name}
                  subtitle={data.organization.name}
                />
                <Socials data={data.organization} />
                <Typography size="h2" fontWeight="medium" className="mt-5">
                  Membres
                </Typography>
                <Members data={data.members} />
                <Typography size="h2" fontWeight="medium">
                  Publications
                </Typography>
              </>
            )}
          />
        </View>
      )}
    </PageContainer>
  );
}
