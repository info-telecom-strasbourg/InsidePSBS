import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: ({ box = COLORS.box_light }) => ({
    backgroundColor: box,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 10,
  }),
  image: () => ({
    width: 50,
    height: 50,
    borderRadius: 50,
  }),
  imageContainer: () => ({
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: 2,
    borderRadius: 50,
  }),
});

export default styles;
