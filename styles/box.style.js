import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const boxStyles = StyleSheet.create({
  box: ({ box = COLORS.box_light }) => ({
    backgroundColor: box,
    verticalPadding: 15,
    horizontalPadding: 13,
    borderRadius: 20,
  }),
  boxSmall: ({ box = COLORS.box_light }) => ({
    backgroundColor: box,
    verticalPadding: 10,
    horizontalPadding: 13,
    borderRadius: 15,
  }),
});

export default boxStyles;
