import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useAuthStore } from "@/hooks/useAuthStore";
import { router } from "expo-router";

export default function RoutePage() {
  const { setToken, clearToken, token } = useAuthStore();

  return (
    <PageContainer className="flex flex-col gap-4">
      <Header title="Dev" leftIcon="inside-psbs" rightIcon="close" />
      <Button
        onPress={() => setToken("87|m7VZi5MWAmtz3gFkKolgqjAWCeJucV90ZOEdzcCx")}
      >
        Set token
      </Button>
      <Button onPress={() => clearToken()} variant="secondary">
        Clear token
      </Button>
      <Typography size="h2">Token : {token}</Typography>
      <Button onPress={() => router.push("/home")}>Accéder à l'appli</Button>
    </PageContainer>
  );
}
