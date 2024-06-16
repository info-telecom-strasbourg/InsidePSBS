import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="sign-up"
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen
        name="sign-in"
        options={{ animation: "fade_from_bottom" }}
      />
    </Stack>
  );
};

export default AuthLayout;
