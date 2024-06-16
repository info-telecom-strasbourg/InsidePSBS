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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(dev)/dev"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="(public)"
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
