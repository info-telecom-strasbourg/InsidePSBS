import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";
import { useTheme } from "../../contexts/themeContext";

const styles = StyleSheet.create({
  textInputLabel: ({ text } = useTheme().theme) => ({
    color: text,
    fontSize: 18,
    fontFamily: FONTS.OpenSans.semiBold,
  }),
  textInputEntry: ({ text, background } = useTheme().theme) => ({
    backgroundColor: background,
    color: text,
    height: 54,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
  }),
});

export default styles;
