import { Provider } from "@/components/primitives/providers";
import { CarouselModal } from "@/features/post/carousel-modal";
import { DeletePostModal } from "@/features/post/delete-post-modal";
import { MediaCarouselProvider } from "@/features/post/media-carousel.context";
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
        <MediaCarouselProvider>
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
          <CarouselModal />
        </MediaCarouselProvider>
      </BottomSheetModalProvider>
    </Provider>
  );
}
