import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const styles = StyleSheet.create({
  badgeContainer: ({ size = 30, background = COLORS.primary }) => ({
    backgroundColor: background,
    borderRadius: size,
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
  }),
  badgeText: ({ size = 30, text = COLORS.white }) => ({
    color: text,
    fontSize: 0.6 * size,
    lineHeight: size,
    fontFamily: FONTS.OpenSans.bold,
  }),
});

export default styles;
