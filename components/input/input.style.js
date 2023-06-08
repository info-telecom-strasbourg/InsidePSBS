import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
  },
  textInputLabel: ({ color }) => ({
    color,
    fontSize: 18,
    fontFamily: FONTS.OpenSans.semiBold,
  }),
  textInputEntry: ({ background, color }) => ({
    backgroundColor: background,
    color,
    height: 54,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
  }),
});

export default styles;
