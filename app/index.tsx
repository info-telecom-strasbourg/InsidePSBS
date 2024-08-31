import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Link } from "@/components/primitives/link";
import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { Href } from "expo-router";
import { Redirect } from "expo-router";
import { Image, View } from "react-native";

export default function AuthPage() {
  const modalRouter = useModalRouter();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Redirect href={routes.home as Href} />;
  return (
    <PageContainer className="flex flex-col justify-between">
      <View className="flex flex-1 flex-col items-center justify-center gap-2">
        <Image
          source={require("assets/images/favicon.png")}
          className="mb-4 size-44"
          width={128}
          height={128}
        />
        <Typography size="h1" fontWeight="bold">
          Bienvenue sur
        </Typography>
        <Typography size="h1" fontWeight="bold" className="text-primary">
          InsidePSBS
        </Typography>
      </View>
      <View className="flex flex-col gap-4">
        <Button onPress={() => modalRouter.open("/auth/sign-up/step-1")}>
          Créer un compte
        </Button>
        <Button
          onPress={() => modalRouter.open(routes.sign_in)}
          variant="secondary"
        >
          J'ai déjà un compte
        </Button>
        <View className="mt-20 flex flex-col gap-2">
          {process.env.EXPO_PUBLIC_MODE === "developer" && (
            <Link
              className="text-center"
              onPress={() => modalRouter.open("dev")}
            >
              Dev screen
            </Link>
          )}
          <Link
            onPress={() => modalRouter.open("cgu")}
            className="text-center text-foreground"
          >
            Conditions d'utilisation
          </Link>
        </View>
      </View>
    </PageContainer>
  );
}
