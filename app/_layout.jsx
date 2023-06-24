import React from "react";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";

import { AuthProvider, ThemeProvider } from "../contexts";
import { StatusBar, WebContainer } from "../components";
import { lockScreenOrientation } from "../utils";
import { LocalStorageProvider } from "../contexts/localStorageContext";

const AppLayout = () => {
  const modalOptions = {
    presentation: "modal",
    animation: "fade_from_bottom",
  };

  lockScreenOrientation();

  const Container = Platform.OS === "web" ? WebContainer : View;

  return (
    <LocalStorageProvider>
      <AuthProvider>
        <ThemeProvider>
          <StatusBar />
          <Container style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ animation: "default" }} />
              <Stack.Screen name="(modals)" options={modalOptions} />
              <Stack.Screen name="(auth)" options={{ animation: "none" }} />
            </Stack>
          </Container>
        </ThemeProvider>
      </AuthProvider>
    </LocalStorageProvider>
  );
};

export default AppLayout;
