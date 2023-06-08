import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";

const styles = StyleSheet.create({
  btnContainer: (backgroundColor) => ({
    backgroundColor,
    width: "100%",
    padding: 10,
    borderRadius: 20,
  }),
  btnText: (color) => ({
    color,
    textAlign: "center",
    fontFamily: FONTS.OpenSans.bold,
    fontSize: 20,
  }),
});

export default styles;
