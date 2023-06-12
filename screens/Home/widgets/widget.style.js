import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../constants";

const widgetStyle = ({
  backgroundColor,
  color = COLORS.white,
  width = 0,
  height = 0,
}) =>
  StyleSheet.create({
    widgetContainer: {
      backgroundColor,
      width,
      height,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    widgetTitle: {
      color: color,
      fontFamily: FONTS.OpenSans.bold,
      fontSize: 25,
    },
    defaultWidget: {
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default widgetStyle;
