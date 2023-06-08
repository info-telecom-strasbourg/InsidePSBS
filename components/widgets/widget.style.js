import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";

const styles = StyleSheet.create({
  widgetContainer: ({ backgroundColor, width, height }) => ({
    backgroundColor,
    width,
    height,
    borderRadius: 20,
    padding: 10,
  }),
  widgetTitle: ({ color }) => ({
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
