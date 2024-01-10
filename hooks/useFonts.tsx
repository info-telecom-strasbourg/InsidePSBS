import { fontsPath } from "constants/fonts";
import { useFonts as useExpoFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

export const useFonts = () => {
  const [fontsLoaded] = useExpoFonts(fontsPath);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  return { onLayoutRootView, fontsLoaded };
};
