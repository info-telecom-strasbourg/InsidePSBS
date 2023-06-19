import React from "react";

import ColoredButton from "./ColoredButton";
import { COLORS } from "../../constants";

const PrimaryButton = ({ text, onPress }) => {
  return (
    <ColoredButton
      text={text}
      onPress={onPress}
      foreground={COLORS.white}
      background={COLORS.primary}
    />
  );
};

export default PrimaryButton;
