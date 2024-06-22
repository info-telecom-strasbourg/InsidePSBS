import { Stack } from "expo-router";

const CardsLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    />
  );
};

export default CardsLayout;
