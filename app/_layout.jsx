import React from "react";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";

import { AuthProvider, ThemeProvider } from "../contexts";
import { StatusBar, WebContainer } from "../components";
import { initNotification, lockScreenOrientation } from "../utils";
import { LocalStorageProvider } from "../contexts/localStorageContext";

const AppLayout = () => {
  lockScreenOrientation();
  // TODO: implement notifications and preferences
  initNotification();

  const Container = Platform.OS === "web" ? WebContainer : View;

  return (
    <ThemeProvider>
      <LocalStorageProvider>
        <AuthProvider>
          <StatusBar />
          <Container style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade_from_bottom",
              }}
            >
              <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
            </Stack>
          </Container>
        </AuthProvider>
      </LocalStorageProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
