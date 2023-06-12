import { StyleSheet } from "react-native";

const screenStyles = ({ background }) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: background,
      paddingVertical: 30,
    },
    webContainer: {
      flex: 1,
      justifyContent: "center",
      width: "100%",
      flexDirection: "row",
      backgroundColor: background,
    },
  });

export default screenStyles;
