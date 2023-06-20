import React from "react";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { AuthProvider, ThemeProvider } from "../contexts";
import { FontsLoader, WebContainer } from "../components";
import { lockScreenOrientation } from "../utils";

SplashScreen.preventAutoHideAsync().catch((e) => console.error(e));

const AppLayout = () => {
  const modalOptions = {
    presentation: "modal",
    animation: "fade_from_bottom",
  };

  lockScreenOrientation();

  const Container = Platform.OS === "web" ? WebContainer : View;

  return (
    <FontsLoader>
      <AuthProvider>
        <ThemeProvider>
          <Container style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ animation: "default" }} />
              <Stack.Screen name="(modals)" options={modalOptions} />
              <Stack.Screen name="(auth)" options={modalOptions} />
            </Stack>
          </Container>
        </ThemeProvider>
      </AuthProvider>
    </FontsLoader>
  );
};

export default AppLayout;
