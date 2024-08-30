import { Provider } from "@/components/primitives/providers";
import { Stack } from "expo-router";

export default function CardsLayout() {
  return (
    <Provider>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Provider>
  );
}
