import { ScreenContainer, WebContainer } from "components/Containers";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

import StatusBar from "../components/StatusBar";
import { AuthProvider } from "../contexts/authContext";
import { LocalStorageProvider } from "../contexts/localStorageContext";
import { ThemeProvider } from "../contexts/themeContext";

const AppLayout = () => {
  // lock screen orientation
  // useEffect(() => {
  //   if (Platform.OS === "web") return;

  // const lock = async () => {
  //   await ScreenOrientation.lockAsync(
  //     ScreenOrientation.OrientationLock.PORTRAIT,
  //   );
  // };

  // lock();
  //   return () => {
  //     ScreenOrientation.unlockAsync();
  //   };
  // }, []);

  const Container = Platform.OS === "web" ? WebContainer : View;

  return (
    <>
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
                  {/* <Stack.Screen name="(tabs)" options={{ animation: "fade" }} /> */}
                </Stack>
              </Container>
            </RootSiblingParent>
          </AuthProvider>
        </ThemeProvider>
      </LocalStorageProvider>
    </>
  );
};

export default AppLayout;
