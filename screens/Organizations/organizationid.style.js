import { StyleSheet } from "react-native";

import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: () => ({
    alignItems: "center",
    paddingHorizontal: 11,
  }),
  image: () => ({
    width: 90,
    height: 90,
    borderRadius: 90,
  }),
  imageContainer: () => ({
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 90,
  }),
  linkContainer: ({ box = COLORS.box_light }) => ({
    backgroundColor: box,
    borderRadius: 15,
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  }),
});

export default styles;
