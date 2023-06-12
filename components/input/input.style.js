import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const inputStyles = ({
  color = COLORS.text_light,
  background = COLORS.box_light,
}) =>
  StyleSheet.create({
    textInputContainer: {
      flex: 1,
    },
    textInputLabel: {
      color,
      fontSize: 18,
      fontFamily: FONTS.OpenSans.semiBold,
    },
    textInputEntry: {
      backgroundColor: background,
      color,
      height: 54,
      borderRadius: 15,
      paddingHorizontal: 15,
      fontSize: 20,
    },
  });

export default inputStyles;
