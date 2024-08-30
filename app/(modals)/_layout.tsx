import { useAuth } from "@/auth/useAuth";
import { routes } from "@/constants/routes";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { Href } from "expo-router";
import { Redirect, Stack } from "expo-router";

export default function CardsLayout() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  if (!isAuthenticated) return <Redirect href={routes.root as Href} />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors[theme].background },
      }}
    />
  );
}
