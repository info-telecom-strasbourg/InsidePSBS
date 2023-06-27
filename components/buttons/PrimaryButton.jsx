import React from "react";

import ColoredButton from "./ColoredButton";
import { COLORS } from "../../constants";

const PrimaryButton = ({ text, onPress, style, textStyle }) => {
  return (
    <ColoredButton
      text={text}
      onPress={onPress}
      foreground={COLORS.white}
      background={COLORS.primary}
      style={style}
      textStyle={textStyle}
    />
  );
};

export default PrimaryButton;
