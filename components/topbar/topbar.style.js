import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  topbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
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

export default styles;
