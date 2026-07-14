import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [fontsLoaded, fontsError] = useFonts({
  //   SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  // });
  const isLoggedIn = false; // Replace with your actual authentication logic
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="welcome" />
          <Stack.Screen name="(auth)/log-in" />
          <Stack.Screen name="(auth)/sign-up" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
