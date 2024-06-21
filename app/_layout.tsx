import { Provider } from "@/features/providers";
import { useFonts } from "@/hooks/useFonts";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { fontsLoaded, error } = useFonts();

  if (!fontsLoaded || error) return null;

  return (
    <Provider>
      <Stack
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      >
        <Stack.Screen name="index" options={{ animation: "none" }} />
        <Stack.Screen name="(tabs)" options={{ animation: "ios" }} />
        <Stack.Screen name="(public)/cgu" />
        <Stack.Screen name="(dev)/dev" />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
