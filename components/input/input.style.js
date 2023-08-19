import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";
import { useTheme } from "../../contexts/themeContext";

const styles = StyleSheet.create({
  textInputLabel: ({ text } = useTheme().theme) => ({
    color: text,
    fontSize: 18,
    fontFamily: FONTS.OpenSans.semiBold,
  }),
  textInputEntry: ({ text, box } = useTheme().theme) => ({
    backgroundColor: box,
    color: text,
    minHeight: 54,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
  }),
});

export default styles;
