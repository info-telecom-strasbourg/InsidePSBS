import FONTS from "constants/fonts";

import { createTextComponent } from "./Text";

export const Body1 = createTextComponent({
  fontSize: 18,
  fontFamily: FONTS.OpenSans.regular,
  lineHeight: 25,
});

export const Body2 = createTextComponent({
  fontSize: 16,
  fontFamily: FONTS.OpenSans.regular,
  lineHeight: 22,
});

export const Body3 = createTextComponent({
  fontSize: 15,
  fontFamily: FONTS.OpenSans.regular,
  lineHeight: 20,
});
