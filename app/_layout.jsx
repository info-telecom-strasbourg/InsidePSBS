import { Stack } from "expo-router";
import { ThemeProvider } from "../contexts/themeContext";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useCallback, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import WebContainer from "../components/screencontainer/WebContainer";

SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const [fontsLoaded] = useFonts({
    OpenSansBold: require("../assets/fonts/open-sans/OpenSans-Bold.ttf"),
    OpenSansExtraBold: require("../assets/fonts/open-sans/OpenSans-ExtraBold.ttf"),
    OpenSansItalic: require("../assets/fonts/open-sans/OpenSans-Italic.ttf"),
    OpenSansLight: require("../assets/fonts/open-sans/OpenSans-Light.ttf"),
    OpenSansMedium: require("../assets/fonts/open-sans/OpenSans-Medium.ttf"),
    OpenSansRegular: require("../assets/fonts/open-sans/OpenSans-Regular.ttf"),
    OpenSansSemiBold: require("../assets/fonts/open-sans/OpenSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (Platform.OS === "web") return;

    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    lockScreenOrientation();
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const modalOptions = {
    presentation: "modal",
    animation: "slide_from_bottom",
  };

  return (
<<<<<<< HEAD
    <FontLoader>
      <ThemeProvider>
        <WebContainer>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="fouaille" options={modalOptions} />
            <Stack.Screen name="settings" options={modalOptions} />
          </Stack>
        </WebContainer>
      </ThemeProvider>
    </FontLoader>
=======
    <ThemeProvider onLayout={onLayoutRootView}>
      <WebContainer>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="fouaille" options={{ presentation: "modal" }} />
        </Stack>
      </WebContainer>
    </ThemeProvider>
>>>>>>> parent of b866aa0 (refactoring)
  );
};

export default AppLayout;
