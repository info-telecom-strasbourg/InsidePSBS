import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../constants";
import { useTheme } from "../contexts/themeContext";

const textStyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    title1: {
      color: theme.text,
      fontSize: 30,
      fontFamily: FONTS.OpenSans.bold,
      lineHeight: 41,
    },
    title2: {
      color: theme.text,
      fontSize: 25,
      fontFamily: FONTS.OpenSans.bold,
      lineHeight: 34,
    },
    title3: {
      color: theme.text,
      fontSize: 20,
      fontFamily: FONTS.OpenSans.bold,
      lineHeight: 27,
    },
    title4: {
      color: theme.text,
      fontSize: 20,
      fontFamily: FONTS.OpenSans.semiBold,
      lineHeight: 27,
    },

    body1: {
      color: theme.text,
      fontSize: 18,
      fontFamily: FONTS.OpenSans.regular,
      lineHeight: 25,
    },
    body2: {
      color: theme.text,
      fontSize: 16,
      fontFamily: FONTS.OpenSans.regular,
      lineHeight: 22,
    },
    body3: {
      color: theme.text,
      fontSize: 15,
      fontFamily: FONTS.OpenSans.regular,
      lineHeight: 20,
    },
  });
};

export default textStyles;
