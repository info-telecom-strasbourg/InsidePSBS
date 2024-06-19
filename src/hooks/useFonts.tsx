import { useFonts as useNativeFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export const useFonts = () => {
  const [fontsLoaded, error] = useNativeFonts({
    "Inter-regular": require("../../assets/fonts/inter/Inter-Regular.ttf"),
    "Inter-bold": require("../../assets/fonts/inter/Inter-Bold.ttf"),
    "Inter-light": require("../../assets/fonts/inter/Inter-Light.ttf"),
    "Inter-medium": require("../../assets/fonts/inter/Inter-Medium.ttf"),
    "Inter-semibold": require("../../assets/fonts/inter/Inter-SemiBold.ttf"),
    "Inter-thin": require("../../assets/fonts/inter/Inter-Thin.ttf"),
    "Inter-black": require("../../assets/fonts/inter/Inter-Black.ttf"),
    "Inter-extrabold": require("../../assets/fonts/inter/Inter-ExtraBold.ttf"),
    "Inter-extralight": require("../../assets/fonts/inter/Inter-ExtraLight.ttf"),

    "SpaceGrotesk-regular": require("../../assets/fonts/space-grotesk/SpaceGrotesk-regular.ttf"),
    "SpaceGrotesk-bold": require("../../assets/fonts/space-grotesk/SpaceGrotesk-bold.ttf"),
    "SpaceGrotesk-light": require("../../assets/fonts/space-grotesk/SpaceGrotesk-light.ttf"),
    "SpaceGrotesk-medium": require("../../assets/fonts/space-grotesk/SpaceGrotesk-medium.ttf"),
    "SpaceGrotesk-semibold": require("../../assets/fonts/space-grotesk/SpaceGrotesk-semibold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return { fontsLoaded, error };
};
