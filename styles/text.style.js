import { StyleSheet } from "react-native";
import { FONTS } from "../constants";

const textStyles = StyleSheet.create({
  title1: ({ text }) => ({
    color: text,
    fontSize: 30,
    fontFamily: FONTS.OpenSans.bold,
    lineHeight: 41,
  }),
  title2: ({ text }) => ({
    color: text,
    fontSize: 25,
    fontFamily: FONTS.OpenSans.bold,
    lineHeight: 34,
  }),
  title3: ({ text }) => ({
    color: text,
    fontSize: 20,
    fontFamily: FONTS.OpenSans.bold,
    lineHeight: 27,
  }),
  title4: ({ text }) => ({
    color: text,
    fontSize: 20,
    fontFamily: FONTS.OpenSans.semiBold,
    lineHeight: 27,
  }),

  body1: ({ text }) => ({
    color: text,
    fontSize: 18,
    fontFamily: FONTS.OpenSans.regular,
    lineHeight: 25,
  }),
  body2: ({ text }) => ({
    color: text,
    fontSize: 16,
    fontFamily: FONTS.OpenSans.regular,
    lineHeight: 22,
  }),
  body3: ({ text }) => ({
    color: text,
    fontSize: 15,
    fontFamily: FONTS.OpenSans.regular,
    lineHeight: 20,
  }),
});

export default textStyles;
