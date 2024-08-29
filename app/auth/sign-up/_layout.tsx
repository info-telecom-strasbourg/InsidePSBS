import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Stack, usePathname } from "expo-router";
import { SignUpProvider } from "./_features/use-sign-up";

export default function SignUpLayout() {
  const pathname = usePathname();
  const step = parseInt(pathname[pathname.length - 1]);
  const { theme } = useTheme();
  return (
    <SignUpProvider>
      <PageContainer>
        <Header
          title="Créer un compte"
          leftIcon={step === 1 ? undefined : "back"}
          rightIcon="close"
        />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: colors[theme].background },
          }}
        />
      </PageContainer>
    </SignUpProvider>
  );
}
