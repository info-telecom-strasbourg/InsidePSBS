import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const styles = (size) => {
  return StyleSheet.create({
    badgeContainer: {
      backgroundColor: COLORS.primary,
      borderRadius: size,
      size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    },
    badgeText: {
      color: COLORS.white,
      fontSize: 0.6 * size,
      lineHeight: size,
      fontFamily: FONTS.OpenSans.bold,
    },
  });
};

export default styles;
