import { useFonts } from "hooks/useFonts";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

import { AuthProvider } from "./authContext";
import { ThemeProvider, useTheme } from "./themeContext";

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <FontsProvider>
        <AuthProvider>
          <RootSiblingParent>{children}</RootSiblingParent>
        </AuthProvider>
      </FontsProvider>
    </ThemeProvider>
  );
};

const FontsProvider = ({ children }: PropsWithChildren) => {
  const { onLayoutRootView, fontsLoaded } = useFonts();
  const { theme } = useTheme();

  if (!fontsLoaded) return null;

  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, backgroundColor: theme.background }}>
      {children}
    </View>
  );
};

export default Provider;
