/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
} from "react-native";

import Colors from "../constants/Colors";

type ThemeProperties = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProperties & DefaultText["props"];
export type ViewProps = ThemeProperties & DefaultView["props"];

export function useThemeColor(
  properties: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProperties = properties[theme];

  return colorFromProperties ? colorFromProperties : Colors[theme][colorName];
}

export function Text(properties: TextProps) {
  const { style, lightColor, darkColor, ...otherProperties } = properties;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProperties} />;
}

export function View(properties: ViewProps) {
  const { style, lightColor, darkColor, ...otherProperties } = properties;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <DefaultView style={[{ backgroundColor }, style]} {...otherProperties} />
  );
}
