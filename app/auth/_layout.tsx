import { useAuth } from "@/auth/useAuth";
import { routes } from "@/constants/routes";
import type { Href } from "expo-router";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Redirect href={routes.home as Href} />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
