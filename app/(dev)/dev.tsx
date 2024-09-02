import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Modal, useModalRouter } from "@/components/primitives/modal";
import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import { useRouter } from "expo-router";

export default function DevPage() {
  const { token, user, signIn, signOut, isAuthenticated } = useAuth();
  const router = useRouter();
  const { openModal } = useModalRouter();

  return (
    <PageContainer className="flex flex-col gap-4">
      <Header title="Dev" leftIcon="inside-psbs" rightIcon="close" />
      {!isAuthenticated ? (
        <Button
          onPress={async () =>
            await signIn({
              email: `${process.env.EXPO_PUBLIC_DEV_EMAIL}`,
              password: `${process.env.EXPO_PUBLIC_DEV_PASSWORD}`,
            })
          }
        >
          Sign In
        </Button>
      ) : (
        <Button onPress={async () => await signOut()}>Sign Out</Button>
      )}
      <Typography size="h5">Token : {token}</Typography>
      <Typography size="h5">User : {user?.email}</Typography>
      <Typography size="h5">
        Is authenticated : {isAuthenticated.toString()}
      </Typography>
      <Button onPress={() => router.replace(routes.home)}>
        Accéder à l'appli
      </Button>
      <Button onPress={() => openModal()}>Open Modal</Button>
      <Modal></Modal>
    </PageContainer>
  );
}
