import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { useMe } from "@app/(tabs)/profile/_features/me.query";
import { useRouter } from "expo-router";
import {
  AtSign,
  BookMarked,
  Building,
  Cake,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react-native";
import { RefreshControl, ScrollView, View } from "react-native";
import { SettingsButton } from "./_features/settings-button";
import { SettingsTitle } from "./_features/settings-title";

export default function SettingsPage() {
  const { data, isLoading, handleRefresh, isRefreshing } = useMe();
  const { signOut } = useAuth();
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
          <View>
            <SettingsTitle label="Profil" />
            <SettingsButton
              label="Nom d'utilisateur"
              subtitle={`@${data.data.user_name}`}
              icon={User}
              onPress={() => {}}
            />
            <SettingsButton
              label="Mot de passe"
              subtitle="********"
              icon={Lock}
              onPress={() => {}}
            />
            <SettingsButton
              label="Téléphone"
              subtitle={data.data.phone?.toString()}
              icon={Phone}
              onPress={() => {}}
            />
            <SettingsButton
              label="Filière"
              subtitle={data.data.sector}
              icon={Building}
              onPress={() => {}}
            />
            <SettingsButton
              label="Année d'arrivée"
              subtitle={data.data.admission_year}
              icon={Cake}
              onPress={() => {}}
            />
          </View>
          <View>
            <SettingsTitle label="A propos" />
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
          </View>
          <View className="gap-4">
            <Button onPress={() => signOut()}>Se déconnecter</Button>
            <Button variant="destructive" className="border border-red">
              Supprimer mon compte
            </Button>
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
}
