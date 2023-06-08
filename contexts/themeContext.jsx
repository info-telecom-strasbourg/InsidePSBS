import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme, Appearance } from "react-native";
import { COLORS } from "../constants";

const ThemeContext = createContext({});
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(systemScheme);

  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener(
      ({ colorScheme }) => {
        setColorScheme(colorScheme);
      }
    );
    return () => {
      appearanceListener.remove();
    };
  }, []);

  const toggleColorScheme = () => {
    Appearance.set(colorScheme === "dark" ? "light" : "dark");
  };

  const useSystemColorScheme = () => {
    Appearance.set(systemScheme);
  };

  const theme = {};
  if (colorScheme === "light") {
    theme.background = COLORS.background_light;
    theme.box = COLORS.box_light;
    theme.box_secondary = COLORS.box_secondary_light;
    theme.text = COLORS.text_light;
    theme.text_secondary = COLORS.text_secondary_light;
  }

  if (colorScheme === "dark") {
    theme.background = COLORS.background_dark;
    theme.box = COLORS.box_dark;
    theme.box_secondary = COLORS.box_secondary_dark;
    theme.text = COLORS.text_dark;
    theme.text_secondary = COLORS.text_secondary_dark;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, toggleColorScheme, useSystemColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
