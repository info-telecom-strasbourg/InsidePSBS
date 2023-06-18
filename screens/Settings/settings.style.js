import { StyleSheet } from "react-native";
import { useTheme } from "../../contexts/themeContext";
import { FONTS } from "../../constants";

const settingsStyle = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: theme.box,
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    buttonWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    buttonText: {
      color: theme.text,
      fontSize: 15,
      fontFamily: FONTS.OpenSans.semiBold,
    },
  });
};

export default settingsStyle;
