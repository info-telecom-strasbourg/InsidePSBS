import { useAuth } from "@/auth/useAuth";
import { routes } from "@/constants/routes";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Redirect href={routes.home} />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
