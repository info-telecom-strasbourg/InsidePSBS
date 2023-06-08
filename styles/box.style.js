import { StyleSheet } from "react-native";

const boxStyles = StyleSheet.create({
  box: ({ box }) => ({
    backgroundColor: box,
    verticalPadding: 15,
    horizontalPadding: 13,
    borderRadius: 20,
  }),
  boxSmall: ({ box }) => ({
    backgroundColor: box,
    verticalPadding: 10,
    horizontalPadding: 13,
    borderRadius: 15,
  }),
});

export default boxStyles;
