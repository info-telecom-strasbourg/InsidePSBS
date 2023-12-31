import { StyleSheet } from "react-native";

import { FONTS } from "../../../constants";
import { useTheme } from "../../../contexts/themeContext";

const transactionStyle = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    title: {
      color: theme.text,
      fontWeight: "600",
      fontSize: 20,
      marginBottom: 15,
      marginHorizontal: 10,
      marginTop: 50,
    },
    transaction: {
      borderRadius: 10,
      backgroundColor: theme.box,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 2,
      flexDirection: "column",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      color: theme.text,
      fontSize: 15,
      fontFamily: FONTS.OpenSans.bold,
    },
    date: {
      color: theme.text_secondary,
      fontFamily: FONTS.OpenSans.bold,
      fontSize: 15,
    },
    details: {
      color: theme.text,
      fontSize: 15,
      fontFamily: FONTS.OpenSans.semiBold,
    },
  });
};

export default transactionStyle;
