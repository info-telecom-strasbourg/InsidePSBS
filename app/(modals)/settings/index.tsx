import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import {
  SettingButtonPrimitive,
  SettingsButton,
} from "@/features/settings/settings-button";
import { SettingsTitle } from "@/features/settings/settings-title";
import { useRefresh } from "@/hooks/useRefresh";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useRouter } from "expo-router";
import {
  AtSign,
  BookMarked,
  Building,
  Cake,
  Code,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react-native";
import { View } from "react-native";

export default function SettingsPage() {
  const { data, isLoading, handleRefresh, isRefreshing } = useMe();
  const { signOut } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const isPageLoading = !data?.data || isLoading || isRefreshing;

  useRefresh(handleRefresh);

  return (
    <PageContainer>
      <Header title="Paramètres" rightIcon="close" leftIcon="inside-psbs" />
      {isPageLoading ? (
        <View className="flex-1 items-center justify-center">
          <PageLoading />
        </View>
      ) : (
        <RefreshView
          handleRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-8 py-2">
            <View>
              <SettingsTitle label="Profil" className="mb-2" />
              <SettingButtonPrimitive
                onPress={() => router.push("/settings/profile/avatar")}
              >
                <ProfilePicture
                  avatar={data.data.avatar_url}
                  imageSize={28}
                  isOrganization
                  name={data.data.user_name}
                  color={colors[theme].popover}
                  textClassName="text-lg font-medium"
                />
                <Typography size="h4" fontWeight="semibold">
                  Photo de profil
                </Typography>
              </SettingButtonPrimitive>
              <SettingsButton
                label="Nom d'utilisateur"
                subtitle={`@${data.data.user_name}`}
                icon={User}
                onPress={() => router.push("/settings/profile/username")}
              />
              <SettingsButton
                label="Mot de passe"
                subtitle="********"
                icon={Lock}
                onPress={() => router.push("/settings/profile/password")}
              />
              <SettingsButton
                label="Téléphone"
                subtitle={data.data.phone?.toString()}
                icon={Phone}
                onPress={() => router.push("/settings/profile/phone")}
              />
              <SettingsButton
                label="Filière"
                subtitle={data.data.sector}
                icon={Building}
                onPress={() => router.push("/settings/profile/sector")}
              />
              <SettingsButton
                label="Année d'arrivée"
                subtitle={data.data.admission_year}
                icon={Cake}
                onPress={() => router.push("/settings/profile/admission_year")}
              />
            </View>
            <View>
              <SettingsTitle label="A propos" className="mb-2" />
              <SettingsButton
                label="Nous contacter"
                subtitle="Si vous rencontrez un problème"
                icon={Mail}
                onPress={() => {
                  router.push("mailto:info.telecom.strasbourg@gmail.com");
                }}
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
              {process.env.EXPO_PUBLIC_MODE === "developer" && (
                <SettingsButton
                  label="Développeur"
                  icon={Code}
                  onPress={() => {
                    router.push("/dev");
                  }}
                />
              )}
            </View>
            <View className="gap-4">
              <Button onPress={() => signOut()}>Se déconnecter</Button>
              <Button variant="destructive" className="border border-red">
                Supprimer mon compte
              </Button>
            </View>
          </View>
        </RefreshView>
      )}
    </PageContainer>
  );
}
