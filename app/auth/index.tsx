import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Link, useRouter } from "expo-router";
import { Image, View } from "react-native";

const AuthPage = () => {
  const router = useRouter();
  console.log(process.env.EXPO_PUBLIC_MODE);
  return (
    <PageContainer className="0 flex flex-col justify-between">
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
        <Button onPress={() => router.push("/auth/sign-up")}>
          Créer un compte
        </Button>
        <Button
          onPress={() => router.push("/auth/sign-in")}
          variant="secondary"
        >
          J'ai déjà un compte
        </Button>
        <View className="mt-20 flex flex-col gap-2">
          {process.env.EXPO_PUBLIC_MODE === "developer" && (
            <Link href="/dev" className="text-center text-primary">
              Dev screen
            </Link>
          )}
          <Link href="/cgu" className="text-center text-foreground">
            Conditions d'utilisation
          </Link>
        </View>
      </View>
    </PageContainer>
  );
};

export default AuthPage;
