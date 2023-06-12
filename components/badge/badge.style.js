import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const badgeStyles = ({
  backgroundColor = COLORS.primary,
  width = 27,
  color = COLORS.white,
}) =>
  StyleSheet.create({
    badgeContainer: {
      backgroundColor,
      borderRadius: width,
      width,
      height: width,
      alignItems: "center",
      justifyContent: "center",
    },
    badgeText: {
      color,
      fontSize: 0.6 * width,
      lineHeight: width,
      fontFamily: FONTS.OpenSans.bold,
    },
  });

export default badgeStyles;
