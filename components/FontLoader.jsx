import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    OpenSansBold: require("../assets/fonts/open-sans/OpenSans-Bold.ttf"),
    OpenSansExtraBold: require("../assets/fonts/open-sans/OpenSans-ExtraBold.ttf"),
    OpenSansItalic: require("../assets/fonts/open-sans/OpenSans-Italic.ttf"),
    OpenSansLight: require("../assets/fonts/open-sans/OpenSans-Light.ttf"),
    OpenSansMedium: require("../assets/fonts/open-sans/OpenSans-Medium.ttf"),
    OpenSansRegular: require("../assets/fonts/open-sans/OpenSans-Regular.ttf"),
    OpenSansSemiBold: require("../assets/fonts/open-sans/OpenSans-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      {children}
    </View>
  );
};

export default FontLoader;
