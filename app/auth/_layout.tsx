import { useAuth } from "@/auth/useAuth";
import { routes } from "@/constants/routes";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { Href } from "expo-router";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  if (isAuthenticated) return <Redirect href={routes.home as Href} />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors[theme].background },
      }}
    />
  );
}
