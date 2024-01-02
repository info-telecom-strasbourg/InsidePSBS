import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "constants/colors";
import * as SystemUI from "expo-system-ui";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance, useColorScheme } from "react-native";

type ThemeType = {
  background: string;
  box: string;
  box_secondary: string;
  text: string;
  text_secondary: string;
  tabBar: string;
};

type ThemeContextType = {
  theme: ThemeType;
  colorScheme: string;
  setColorScheme: (colorScheme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  if (!ThemeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [colorScheme, setColorScheme] = useState("classic");
  const systemScheme = useColorScheme();

  useEffect(() => {
    const getTheme = async () => {
      try {
        const value = await AsyncStorage.getItem("theme");
        if (value !== null) {
          setColorScheme(value);
        } else {
          AsyncStorage.setItem("theme", "classic"); // not clean but works
        }
      } catch (e) {
        // error reading value
        console.error(e);
      }
    };
    getTheme();
  }, []);

  const setTheme = async ({ colorScheme }) => {
    if (colorScheme === "auto") {
      console.log(systemScheme);
      setColorScheme(systemScheme);
    } else {
      setColorScheme(colorScheme);
    }
    await SystemUI.setBackgroundColorAsync(
      colorScheme === "dark"
        ? COLORS.background_dark
        : colorScheme === "light"
          ? COLORS.background_light
          : COLORS.background,
    );
  };

  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener(setTheme);
    setTheme({ colorScheme });
    return () => {
      appearanceListener.remove();
    };
  }, [colorScheme]);

  const theme = ((): ThemeType => {
    switch (colorScheme) {
      case "light":
        return {
          background: COLORS.background_light,
          box: COLORS.box_light,
          box_secondary: COLORS.box_secondary_light,
          text: COLORS.text_light,
          text_secondary: COLORS.text_secondary_light,
          tabBar: COLORS.tabBar_light,
        };
      case "dark":
        return {
          background: COLORS.background_dark,
          box: COLORS.box_dark,
          box_secondary: COLORS.box_secondary_dark,
          text: COLORS.text_dark,
          text_secondary: COLORS.text_secondary_dark,
          tabBar: COLORS.tabBar_dark,
        };
      case "gold":
        return {
          background: COLORS.background_gold,
          box: COLORS.box_gold,
          box_secondary: COLORS.box_secondary_gold,
          text: COLORS.text_gold,
          text_secondary: COLORS.text_secondary_gold,
          tabBar: COLORS.tabBar_gold,
        };
      default:
        return {
          background: COLORS.background,
          box: COLORS.box,
          box_secondary: COLORS.box_secondary,
          text: COLORS.text,
          text_secondary: COLORS.text_secondary,
          tabBar: COLORS.tabBar,
        };
    }
  })();

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
