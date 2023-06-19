import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const styles = StyleSheet.create({
  badgeContainer: ({ size = 30, backgroundColor = COLORS.primary }) => ({
    backgroundColor,
    borderRadius: size,
    size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
  }),
  badgeText: ({ size = 30, color = COLORS.white }) => ({
    color,
    fontSize: 0.6 * size,
    lineHeight: size,
    fontFamily: FONTS.OpenSans.bold,
  }),
});

export default styles;
