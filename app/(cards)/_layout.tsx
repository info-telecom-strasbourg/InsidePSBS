import { Stack } from "expo-router";

const CardsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="assos" options={{ presentation: "modal" }} />
      <Stack.Screen name="fouaille" options={{ presentation: "modal" }} />
      <Stack.Screen name="menu" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default CardsLayout;
