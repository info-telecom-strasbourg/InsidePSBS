import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { useMe } from "@app/(tabs)/profile/_features/me.query";
import { useRouter } from "expo-router";
import { AtSign, BookMarked, Mail } from "lucide-react-native";
import { RefreshControl, ScrollView, View } from "react-native";
import { SettingsButton } from "./_features/settings-button";
import { SettingsTitle } from "./_features/settings-title";

export default function SettingsPage() {
  const { data, isLoading, handleRefresh, isRefreshing } = useMe();
  const router = useRouter();

  if (!data?.data || isLoading) {
    return <Typography>Loading ...</Typography>;
  }

  return (
    <PageContainer>
      <Header title="Paramètres" rightIcon="close" leftIcon="inside-psbs" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View className="gap-8 py-2">
          <SettingsTitle label="Profil" />
          <View className="gap-2">
            <SettingsTitle label="A propos" />
            <SettingsButton
              label="Nous contacter"
              subtitle="Si vous rencontrez un bug"
              icon={Mail}
              onPress={() => {}}
            />
            <SettingsButton
              label="Conditions d'utilisation"
              icon={BookMarked}
              onPress={() => {
                router.push("/cgu");
              }}
            />
            <SettingsButton
              label="Crédits"
              icon={AtSign}
              onPress={() => {
                router.push("/credits");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
}
