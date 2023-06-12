import React from "react";
import { Stack } from "expo-router";

import { ThemeProvider } from "../contexts/themeContext";
import { lockScreenOrientation } from "../utils";
import { FontLoader, WebContainer } from "../components";

const AppLayout = () => {
  lockScreenOrientation();

  const modalOptions = {
    presentation: "modal",
    animation: "slide_from_bottom",
  };

  return (
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
  );
};

export default AppLayout;
