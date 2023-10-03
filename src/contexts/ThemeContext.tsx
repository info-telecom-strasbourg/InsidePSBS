import type { ColorScheme, Theme } from "@/types/Theme";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "@/constants/colors";
import { setBackgroundColorAsync } from "expo-system-ui";

type ThemeContextValue = {
  theme: Theme;
  colorScheme: ColorScheme;
  setColorScheme: Dispatch<SetStateAction<ColorScheme>>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Custom hook for using ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Provider
export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { colorScheme, setColorScheme, theme } = useThememProvider();
  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThememProvider = (): ThemeContextValue => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("classic");
  const [themeColors, setThemeColors] = useState<Theme>(themes[colorScheme]);
  const systemColorScheme = useColorScheme();

  // Load theme from storage
  useEffect(() => {
    const getTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) setColorScheme(storedTheme as ColorScheme);
        else await AsyncStorage.setItem("theme", colorScheme);
      } catch (error) {
        console.error(error);
      }
    };

    getTheme();
  }, []);

  // Update app color on theme change
  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener(setTheme);
    setThemeColors(themes[colorScheme]);
    return () => {
      appearanceListener.remove();
    };
  }, [colorScheme]);

  // Update theme on color scheme change
  useEffect(() => {
    setTheme({ colorScheme });
  }, [colorScheme]);

  // Update theme
  const setTheme = async ({
    colorScheme: scheme,
  }: {
    colorScheme: ColorScheme;
  }) => {
    if (scheme === "auto") setColorScheme(systemColorScheme);
    else setColorScheme(scheme);

    await setBackgroundColorAsync(themes[scheme].background);
  };

  return {
    theme: themeColors,
    colorScheme,
    setColorScheme,
  };
};
