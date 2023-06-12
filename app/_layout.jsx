import React from "react";
import { Stack } from "expo-router";

import { ThemeProvider } from "../contexts/themeContext";
import { lockScreenOrientation } from "../utils";
import { FontLoader, WebContainer } from "../components";

const AppLayout = () => {
  lockScreenOrientation();

  return (
    <FontLoader>
      <ThemeProvider>
        <WebContainer>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="fouaille" options={{ presentation: "modal" }} />
          </Stack>
        </WebContainer>
      </ThemeProvider>
    </FontLoader>
  );
};

export default AppLayout;
