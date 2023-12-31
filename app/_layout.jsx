import { Stack } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

import { StatusBar, WebContainer } from "../components";
import { AuthProvider, ThemeProvider } from "../contexts";
import { LocalStorageProvider } from "../contexts/localStorageContext";
import { initNotification, lockScreenOrientation } from "../utils";

const AppLayout = () => {
  lockScreenOrientation();

  const Container = Platform.OS === "web" ? WebContainer : View;

  return (
    <LocalStorageProvider>
      <ThemeProvider>
        <AuthProvider>
          <RootSiblingParent>
            <StatusBar />
            <Container style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "fade_from_bottom",
                }}>
                <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
              </Stack>
            </Container>
          </RootSiblingParent>
        </AuthProvider>
      </ThemeProvider>
    </LocalStorageProvider>
  );
};

export default AppLayout;
