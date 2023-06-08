import React from "react";
import ColoredButton from "./ColoredButton";
import { COLORS } from "../../constants";

const PrimaryButton = ({ text, onPress }) => {
  return (
    <ColoredButton
      text={text}
      onPress={onPress}
      color={COLORS.white}
      backgroundColor={COLORS.primary}
    />
  );
};

export default PrimaryButton;
