import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  screenContainer: ({ background }) => ({
    flex: 1,
    backgroundColor: background,
    paddingVertical: 30,
  }),
});

export default styles;
