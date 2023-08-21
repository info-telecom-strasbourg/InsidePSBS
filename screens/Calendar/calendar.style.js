import { StyleSheet } from "react-native";
import { FONTS } from "../../constants";
const calendarStyle = StyleSheet.create({
  dayContainer: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    width: 44,
  },
  dayText: {
    fontFamily: FONTS.OpenSans.semiBold,
    fontSize: 13,
  },
  dateText: {
    fontFamily: FONTS.OpenSans.bold,
    fontSize: 26,
  },
});

export default calendarStyle;
