import { Stack } from "expo-router";

const CardsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="assos/index" />
      <Stack.Screen name="fouaille" />
      <Stack.Screen name="menu" />
    </Stack>
  );
};

export default CardsLayout;
