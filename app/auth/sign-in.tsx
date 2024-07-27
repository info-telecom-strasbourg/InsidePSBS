import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Input } from "@/components/primitives/input";
import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function SignInPage() {
  return (
    <PageContainer>
      <Header title="Se connecter" leftIcon="inside-psbs" rightIcon="close" />
      <View className="mt-8 flex flex-col justify-center gap-8">
        <Input title="Email" />
        <Input title="Mot de passe" variant="password" />
        <Link href={routes.forgot_password}>
          <TouchableOpacity className="flex w-full flex-row gap-2">
            <Typography size="p">Mot de passe oublié ?</Typography>
            <Typography size="p" className="text-primary">
              Réinitialiser
            </Typography>
          </TouchableOpacity>
        </Link>
        <Button>Se connecter</Button>
      </View>
    </PageContainer>
  );
}
