import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const buttonStyles = ({
  backgroundColor = COLORS.primary,
  color = COLORS.white,
}) =>
  StyleSheet.create({
    btnContainer: {
      backgroundColor,
      width: "100%",
      padding: 10,
      borderRadius: 20,
    },
    btnText: {
      color,
      textAlign: "center",
      fontFamily: FONTS.OpenSans.bold,
      fontSize: 20,
    },
  });

export default buttonStyles;
