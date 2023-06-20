import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: ({ background }) => ({
    flex: 1,
    backgroundColor: background,
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
