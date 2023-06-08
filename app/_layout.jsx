import { Stack } from "expo-router";
import { ThemeProvider } from "../contexts/themeContext";
import { FontsLoader } from "../components";

const StackLayout = () => {
  return (
    // <FontsLoader>
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
    // </FontsLoader>
  );
};

export default StackLayout;
