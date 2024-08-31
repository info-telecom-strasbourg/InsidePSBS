import { themes } from "@/theme/color-themes";
import { useColorScheme } from "nativewind";
import { createContext, useContext, type PropsWithChildren } from "react";
import { View } from "react-native";

export type ThemeProviderProps = PropsWithChildren<{}>;

const ThemeContext = createContext<{
  theme: "light" | "dark";
}>({
  theme: "light",
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();

  if (!colorScheme) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme: colorScheme }}>
      <View style={themes[colorScheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
