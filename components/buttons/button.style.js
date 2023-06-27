import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const styles = StyleSheet.create({
  btnContainer: ({ background = COLORS.primary }) => ({
    backgroundColor: background,
    padding: 10,
    borderRadius: 20,
  }),
  btnText: ({ text = COLORS.white }) => ({
    color: text,
    textAlign: "center",
    fontFamily: FONTS.OpenSans.bold,
    fontSize: 20,
  }),
});

export default styles;
