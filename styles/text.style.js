import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../constants";

const text_styles = StyleSheet.create({
  title1: ({ text = COLORS.text_light }) => ({
    color: text,
    fontSize: 30,
    fontFamily: FONTS.OpenSans.bold,
    lineHeight: 41,
  }),
  title2: ({ text = COLORS.text_light }) => ({
    color: text,
    fontSize: 25,
    fontFamily: FONTS.OpenSans.bold,
    lineHeight: 34,
  }),
  title3: ({ text = COLORS.text_light }) => ({
    color: text,
    fontSize: 20,
    fontFamily: FONTS.OpenSans.bold,
    lineHeight: 27,
  }),
  title4: ({ text = COLORS.text_light }) => ({
    color: text,
    fontSize: 20,
    fontFamily: FONTS.OpenSans.semiBold,
    lineHeight: 27,
  }),

  body1: ({ text = COLORS.text_light }) => ({
    color: text,
    fontSize: 18,
    fontFamily: FONTS.OpenSans.regular,
    lineHeight: 25,
  }),
  body2: ({ text = COLORS.text_light }) => ({
    color: text,
    fontSize: 16,
    fontFamily: FONTS.OpenSans.regular,
    lineHeight: 22,
  }),
  body3: ({ text = COLORS.text_light }) => ({
    color: text,
    fontSize: 15,
    fontFamily: FONTS.OpenSans.regular,
    lineHeight: 20,
  }),
});

export default text_styles;
