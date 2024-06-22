import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    />
  );
};

export default AuthLayout;
