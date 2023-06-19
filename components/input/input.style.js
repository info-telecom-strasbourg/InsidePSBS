import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";
import { useTheme } from "../../contexts/themeContext";

const styles = StyleSheet.create({
  textInputLabel: ({ color = useTheme().theme.text }) => ({
    color,
    fontSize: 18,
    fontFamily: FONTS.OpenSans.semiBold,
  }),
  textInputEntry: ({
    color = useTheme().theme.text,
    backgroundColor = useTheme().theme.box,
  }) => ({
    backgroundColor,
    color,
    height: 54,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
  }),
});

export default styles;
