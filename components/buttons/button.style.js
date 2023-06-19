import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const styles = () =>
  StyleSheet.create({
    btnContainer: {
      backgroundColor: COLORS.primary,
      width: "100%",
      padding: 10,
      borderRadius: 20,
    },
    btnText: {
      color: COLORS.white,
      textAlign: "center",
      fontFamily: FONTS.OpenSans.bold,
      fontSize: 20,
    },
  });

export default styles;
