import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  const { theme } = useTheme();

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="back" rightIcon="close" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: colors[theme].background },
        }}
      />
    </PageContainer>
  );
}
