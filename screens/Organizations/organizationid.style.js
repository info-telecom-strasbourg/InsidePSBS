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
  imageContainer: ({ box = COLORS.box_light }) => ({
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: box,
    padding: 10,
    borderRadius: 90,
  }),
  linkContainer: ({ box = COLORS.box_light }) => ({
    backgroundColor: box,
    borderRadius: 15,
    flexDirection: "row",
    paddingVertical: 25,
    width: "100%",
    justifyContent: "center",
  }),
});

export default styles;
