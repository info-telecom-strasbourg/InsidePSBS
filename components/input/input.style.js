import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
  },
  textInputLabel: ({ color = COLORS.text_light }) => ({
    color,
    fontSize: 18,
    fontFamily: FONTS.OpenSans.semiBold,
  }),
  textInputEntry: ({
    background = COLORS.box_light,
    color = COLORS.text_light,
  }) => ({
    backgroundColor: background,
    color,
    height: 54,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
  }),
});

export default styles;
