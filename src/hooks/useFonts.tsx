import { useFonts as useNativeFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export const useFonts = () => {
  const [fontsLoaded, error] = useNativeFonts({
    "OpenSans-bold": require("../../assets/fonts/open-sans/OpenSans-Bold.ttf"),
    "OpenSans-boldItalic": require("../../assets/fonts/open-sans/OpenSans-BoldItalic.ttf"),
    "OpenSans-extrabold": require("../../assets/fonts/open-sans/OpenSans-ExtraBold.ttf"),
    "OpenSans-extraboldItalic": require("../../assets/fonts/open-sans/OpenSans-ExtraBoldItalic.ttf"),
    "OpenSans-light": require("../../assets/fonts/open-sans/OpenSans-Light.ttf"),
    "OpenSans-lightItalic": require("../../assets/fonts/open-sans/OpenSans-LightItalic.ttf"),
    "OpenSans-regular": require("../../assets/fonts/open-sans/OpenSans-Regular.ttf"),
    "OpenSans-regularItalic": require("../../assets/fonts/open-sans/OpenSans-Italic.ttf"),
    "OpenSans-semibold": require("../../assets/fonts/open-sans/OpenSans-SemiBold.ttf"),
    "OpenSans-semiboldItalic": require("../../assets/fonts/open-sans/OpenSans-SemiBoldItalic.ttf"),

    "Roboto-regular": require("../../assets/fonts/roboto/Roboto-Regular.ttf"),
    "Roboto-italic": require("../../assets/fonts/roboto/Roboto-Italic.ttf"),
    "Roboto-bold": require("../../assets/fonts/roboto/Roboto-Bold.ttf"),
    "Roboto-boldItalic": require("../../assets/fonts/roboto/Roboto-BoldItalic.ttf"),
    "Roboto-light": require("../../assets/fonts/roboto/Roboto-Light.ttf"),
    "Roboto-lightItalic": require("../../assets/fonts/roboto/Roboto-LightItalic.ttf"),
    "Roboto-medium": require("../../assets/fonts/roboto/Roboto-Medium.ttf"),
    "Roboto-mediumItalic": require("../../assets/fonts/roboto/Roboto-MediumItalic.ttf"),
    "Roboto-thin": require("../../assets/fonts/roboto/Roboto-Thin.ttf"),
    "Roboto-thinItalic": require("../../assets/fonts/roboto/Roboto-ThinItalic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return { fontsLoaded, error };
};
