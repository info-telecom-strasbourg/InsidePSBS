import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import StatusBar from "@/components/StatusBar";
import { SafeAreaView } from "react-native";

export const unstable_settings = {
  initialRouteName: "/",
};

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    OpenSansBold: require("@/assets/fonts/open-sans/OpenSans-Bold.ttf"),
    OpenSansExtraBold: require("@/assets/fonts/open-sans/OpenSans-ExtraBold.ttf"),
    OpenSansItalic: require("@/assets/fonts/open-sans/OpenSans-Italic.ttf"),
    OpenSansLight: require("@/assets/fonts/open-sans/OpenSans-Light.ttf"),
    OpenSansMedium: require("@/assets/fonts/open-sans/OpenSans-Medium.ttf"),
    OpenSansRegular: require("@/assets/fonts/open-sans/OpenSans-Regular.ttf"),
    OpenSansSemiBold: require("@/assets/fonts/open-sans/OpenSans-SemiBold.ttf"),

    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};

const RootLayoutNav = () => {
  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade_from_bottom",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
        </Stack>
      </SafeAreaView>
    </Provider>
  );
};

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
