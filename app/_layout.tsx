import { Stack } from "expo-router";
import { Platform, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import debug from "utils/debug";

import StatusBar from "../components/StatusBar";
import WebContainer from "../components/screencontainer/WebContainer";
import { AuthProvider } from "../contexts/authContext";
import { LocalStorageProvider } from "../contexts/localStorageContext";
import { ThemeProvider } from "../contexts/themeContext";
import lockScreenOrientation from "../utils/lockScreenOrientation";

const AppLayout = () => {
  lockScreenOrientation();

  const Container = Platform.OS === "web" ? WebContainer : View;
  debug("Test");

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
