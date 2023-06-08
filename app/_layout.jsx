import { Stack } from "expo-router";
import { ThemeProvider } from "../contexts/themeContext";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const [fontsLoaded] = useFonts({
    OpenSansBold: require("../assets/fonts/open-sans/OpenSans-Bold.ttf"),
    OpenSansExtraBold: require("../assets/fonts/open-sans/OpenSans-ExtraBold.ttf"),
    OpenSansItalic: require("../assets/fonts/open-sans/OpenSans-Italic.ttf"),
    OpenSansLight: require("../assets/fonts/open-sans/OpenSans-Light.ttf"),
    OpenSansMedium: require("../assets/fonts/open-sans/OpenSans-Medium.ttf"),
    OpenSansRegular: require("../assets/fonts/open-sans/OpenSans-Regular.ttf"),
    OpenSansSemiBold: require("../assets/fonts/open-sans/OpenSans-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    // <FontsLoader>
    <ThemeProvider onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
    // </FontsLoader>
  );
};

export default StackLayout;