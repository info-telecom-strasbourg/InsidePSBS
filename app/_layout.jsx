import React from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "../contexts";
import { FontsLoader } from "../components";

SplashScreen.preventAutoHideAsync().catch((e) => console.error(e));

const AppLayout = () => {
  const modalOptions = {
    presentation: "modal",
    animation: "fade_from_bottom",
  };

  return (
    <FontsLoader>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ animation: "default" }} />
          <Stack.Screen name="(modals)" options={modalOptions} />
          <Stack.Screen name="(auth)" options={modalOptions} />
        </Stack>
      </ThemeProvider>
    </FontsLoader>
  );
};

export default AppLayout;
