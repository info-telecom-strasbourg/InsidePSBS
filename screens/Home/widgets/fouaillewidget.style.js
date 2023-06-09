import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../constants";

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 10,
    backgroundColor: COLORS.dark_purple,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 14,
  },
  title: {
    fontSize: 22,
    color: COLORS.black,
    fontFamily: FONTS.OpenSans.semiBold,
  },
  money: {
    fontSize: 24,
    fontFamily: FONTS.OpenSans.bold,
  },
  transactionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionText: {
    fontSize: 12,
  },
});

export default styles;
