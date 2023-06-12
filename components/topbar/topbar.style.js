import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const topbarStyles = () =>
  StyleSheet.create({
    topbarContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 15,
      minHeight: 76,
    },
    topbarTitleWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    topbarWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default topbarStyles;
