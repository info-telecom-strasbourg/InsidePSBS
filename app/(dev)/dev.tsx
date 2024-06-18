import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { router } from "expo-router";

export default function RoutePage() {
  const { token, user, signIn, signOut, isAuthenticated } = useAuth();

  return (
    <PageContainer className="flex flex-col gap-4">
      <Header title="Dev" leftIcon="inside-psbs" rightIcon="close" />
      <Button
        onPress={() =>
          signIn({
            email: `${process.env.EXPO_PUBLIC_DEV_EMAIL}`,
            password: `${process.env.EXPO_PUBLIC_DEV_PASSWORD}`,
          })
        }
      >
        Sign In
      </Button>
      <Button onPress={() => signOut()}>Sign Out</Button>
      <Typography size="h5">Token : {token}</Typography>
      <Typography size="h5">User : {user?.email}</Typography>
      <Typography size="h5">
        Is authenticated : {isAuthenticated.toString()}
      </Typography>
      <Button onPress={() => router.push("/home")}>Accéder à l'appli</Button>
    </PageContainer>
  );
}
