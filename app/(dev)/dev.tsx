import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useAuthStore } from "@/hooks/useAuthStore";

export default function RoutePage() {
  const { setToken, clearToken, token } = useAuthStore();

  return (
    <PageContainer className="flex flex-col gap-2">
      <Header title="Dev" leftIcon="inside-psbs" rightIcon="close" />
      <Button onPress={() => setToken("zdazduijazd")}>Set token</Button>
      <Button onPress={() => clearToken()} variant="secondary">
        Clear token
      </Button>
      <Typography size="p">token: {token}</Typography>
    </PageContainer>
  );
}
