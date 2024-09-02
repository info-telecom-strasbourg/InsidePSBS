import { Provider } from "@/components/primitives/providers";
import { DeletePostModal } from "@/features/post/delete-post-modal";
import { useFonts } from "@/hooks/useFonts";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded, error } = useFonts();

  if (!fontsLoaded || error) return null;

  return (
    <Provider>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false, animation: "none" }}>
          <Stack.Screen
            name="(public)"
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
          <Stack.Screen
            name="auth"
            options={{ animation: "fade_from_bottom" }}
          />
        </Stack>
        <DeletePostModal />
      </BottomSheetModalProvider>
    </Provider>
  );
}
