import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const styles = StyleSheet.create({
  widgetContainer: ({
    backgroundColor = COLORS.primary,
    width = 0,
    height = 0,
  }) => ({
    backgroundColor,
    width,
    height,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  }),
  widgetTitle: ({ color = COLORS.white }) => ({
    color,
    fontFamily: FONTS.OpenSans.bold,
    fontSize: 25,
  }),
  defaultWidget: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
