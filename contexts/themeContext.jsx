import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./localStorageContext";
import { Appearance, useColorScheme } from "react-native";
import { COLORS } from "../constants";
import * as SystemUI from "expo-system-ui";

const ThemeContext = createContext({});
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState("classic");
  const { data } = useLocalStorage();
  console.log(data);
  if (data?.theme) {
    setColorScheme(data.theme);
  } else {
    data.theme = "classic";
  }

  const setTheme = async ({ colorScheme }) => {
    setColorScheme(colorScheme);
    await SystemUI.setBackgroundColorAsync(
      colorScheme === "dark"
        ? COLORS.background_dark
        : colorScheme === "light"
        ? COLORS.background_light
        : COLORS.background
    );
  };

  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener(setTheme);
    setTheme({ colorScheme });
    return () => {
      appearanceListener.remove();
    };
  }, []);

  const theme = {};
  if (colorScheme === "classic") {
    theme.background = COLORS.background;
    theme.box = COLORS.box;
    theme.box_secondary = COLORS.box_secondary;
    theme.text = COLORS.text;
    theme.text_secondary = COLORS.text_secondary;
    theme.tabBar = COLORS.tabBar;
  }

  if (colorScheme === "light") {
    theme.background = COLORS.background_light;
    theme.box = COLORS.box_light;
    theme.box_secondary = COLORS.box_secondary_light;
    theme.text = COLORS.text_light;
    theme.text_secondary = COLORS.text_secondary_light;
    theme.tabBar = COLORS.tabBar_light;
  }

  if (colorScheme === "dark") {
    theme.background = COLORS.background_dark;
    theme.box = COLORS.box_dark;
    theme.box_secondary = COLORS.box_secondary_dark;
    theme.text = COLORS.text_dark;
    theme.text_secondary = COLORS.text_secondary_dark;
    theme.tabBar = COLORS.tabBar_dark;
  }

  return (
    <ThemeContext.Provider value={{ theme, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
