import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import Hero from "@/features/profile/hero";
import { useMe } from "@/queries/profiles/me.query";
import { TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const { data, isLoading, error, handleRefresh, isRefreshing } = useMe();

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="inside-psbs" rightIcon="settings" />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <RefreshView isRefreshing={isRefreshing} handleRefresh={handleRefresh}>
          <View className="gap-3">
            <View className="items-center">
              <TouchableOpacity className="w-1/2 items-center justify-center rounded-full border-2 border-muted-foreground p-1">
                <Typography className="text-muted-foreground">
                  Modifier le profil
                </Typography>
              </TouchableOpacity>
            </View>
            <Hero
              avatar={data.data.avatar_url}
              title={`${data.data.first_name} ${data.data.last_name}`}
              subtitle={data.data.user_name}
            />
          </View>
        </RefreshView>
      )}
    </PageContainer>
  );
}
