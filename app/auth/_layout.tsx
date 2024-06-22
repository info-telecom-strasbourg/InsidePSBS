import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        presentation: "modal",
      }}
    />
  );
};

export default AuthLayout;
