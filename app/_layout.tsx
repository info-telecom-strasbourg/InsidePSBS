import { Provider } from "@/features/providers";
import { useFonts } from "@/hooks/useFonts";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded, error } = useFonts();

  if (!fontsLoaded || error) return null;

  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen
          name="(public)/cgu/index"
          options={{ animation: "fade_from_bottom", presentation: "modal" }}
        />
        <Stack.Screen
          name="(dev)/dev"
          options={{ animation: "fade_from_bottom", presentation: "modal" }}
        />
        <Stack.Screen
          name="(modals)"
          options={{ animation: "fade_from_bottom", presentation: "modal" }}
        />
      </Stack>
    </Provider>
  );
}
