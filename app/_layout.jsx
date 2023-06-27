import React from "react";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";

import { AuthProvider, ThemeProvider } from "../contexts";
import { StatusBar, WebContainer } from "../components";
import { initNotification, lockScreenOrientation } from "../utils";
import { LocalStorageProvider } from "../contexts/localStorageContext";

const AppLayout = () => {
  const modalOptions = {
    presentation: "modal",
    animation: "fade_from_bottom",
  };

  lockScreenOrientation();
  initNotification();

  const Container = Platform.OS === "web" ? WebContainer : View;

  return (
    <LocalStorageProvider>
      <AuthProvider>
        <ThemeProvider>
          <StatusBar />
          <Container style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade_from_bottom",
              }}
            >
              <Stack.Screen name="(tabs)" options={{ animation: "default" }} />
            </Stack>
          </Container>
        </ThemeProvider>
      </AuthProvider>
    </LocalStorageProvider>
  );
};

export default AppLayout;
