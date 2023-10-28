import React from "react";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";

import { AuthProvider, ThemeProvider } from "../contexts";
import { StatusBar, WebContainer } from "../components";
import { initNotification, lockScreenOrientation } from "../utils";
import { LocalStorageProvider } from "../contexts/localStorageContext";
import { RootSiblingParent } from "react-native-root-siblings";

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
                }}
              >
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
