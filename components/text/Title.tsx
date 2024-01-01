import FONTS from "constants/fonts";

import { createTextComponent } from "./Text";

export const Title1 = createTextComponent({
  fontSize: 30,
  fontFamily: FONTS.OpenSans.bold,
  lineHeight: 41,
});

export const Title2 = createTextComponent({
  fontSize: 25,
  fontFamily: FONTS.OpenSans.bold,
  lineHeight: 34,
});

export const Title3 = createTextComponent({
  fontSize: 20,
  fontFamily: FONTS.OpenSans.bold,
  lineHeight: 27,
});

export const Title4 = createTextComponent({
  fontSize: 20,
  fontFamily: FONTS.OpenSans.semiBold,
  lineHeight: 27,
});
