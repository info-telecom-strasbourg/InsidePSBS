import { Stack } from "expo-router";
import { ThemeProvider } from "../contexts/themeContext";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import WebContainer from "../components/screencontainer/WebContainer";
import { FontsLoader } from "../components";

SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const modalOptions = {
    presentation: "modal",
    animation: "slide_from_bottom",
  };

  return (
    <FontsLoader>
      <ThemeProvider>
        <WebContainer>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            {/*<Stack.Screen name="fouaille" options={modalOptions} />*/}
            {/*<Stack.Screen name="settings" options={modalOptions} />*/}
          </Stack>
        </WebContainer>
      </ThemeProvider>
    </FontsLoader>
  );
};

export default AppLayout;
