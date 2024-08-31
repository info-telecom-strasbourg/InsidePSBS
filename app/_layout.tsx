import { Provider } from "@/components/primitives/providers";
import { useFonts } from "@/hooks/useFonts";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded, error } = useFonts();

  if (!fontsLoaded || error) return null;

  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen
          name="(public)/cgu/index"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="(dev)/dev"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="(modals)"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen name="auth" options={{ animation: "fade_from_bottom" }} />
      </Stack>
    </Provider>
  );
}
