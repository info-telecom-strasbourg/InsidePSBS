import { Provider } from "@/components/primitives/providers";
import { useFonts } from "@/hooks/useFonts";
import { SplashScreen, Stack } from "expo-router";
import { View } from "react-native";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded, error } = useFonts();

  if (!fontsLoaded || error) return null;

  return (
    <Provider>
      <View className="flex-1 bg-background">
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Screen
            name="(public)"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="(dev)/dev"
            options={{ animation: "fade_from_bottom", presentation: "modal" }}
          />
          <Stack.Screen
            name="(modals)"
            options={{ animation: "fade_from_bottom", presentation: "modal" }}
          />
          <Stack.Screen
            name="auth"
            options={{ animation: "fade_from_bottom", presentation: "modal" }}
          />
        </Stack>
      </View>
    </Provider>
  );
}
