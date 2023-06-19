import React from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "../contexts";
import { FontsLoader, WebContainer } from "../components";

SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const modalOptions = {
    presentation: "modal",
    animation: "fade_from_bottom",
    headerShown: false,
  };

  return (
    <FontsLoader>
      <ThemeProvider>
        <WebContainer>
          <Stack screenOptions={modalOptions}>
            <Stack.Screen name="(tabs)" options={{ animation: "default" }} />
          </Stack>
        </WebContainer>
      </ThemeProvider>
    </FontsLoader>
  );
};

export default AppLayout;
