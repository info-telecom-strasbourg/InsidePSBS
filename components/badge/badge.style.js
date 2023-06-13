import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const styles = StyleSheet.create({
  badgeContainer: ({ backgroundColor = COLORS.primary, width = 27 }) => ({
    backgroundColor,
    borderRadius: width,
    width,
    height: width,
    alignItems: "center",
    justifyContent: "center",
  }),
  badgeText: ({ color = COLORS.white, width = 27 }) => ({
    color,
    fontSize: 0.6 * width,
    lineHeight: width,
    fontFamily: FONTS.OpenSans.bold,
  }),
});

export default styles;
