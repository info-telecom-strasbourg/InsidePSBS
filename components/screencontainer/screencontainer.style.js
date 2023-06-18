import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  screenContainer: ({ background }) => ({
    flex: 1,
    backgroundColor: background,
    paddingVertical: 30,
  }),
  webContainer: ({ background }) => ({
    flex: 1,
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    backgroundColor: background,
  }),
});

export default styles;
