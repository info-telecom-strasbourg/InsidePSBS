import React from "react";
import ColoredButton from "./ColoredButton";
import { useTheme } from "../../contexts/themeContext";

const SecondaryButton = ({ text, onPress }) => {
  const { theme } = useTheme();

  return (
    <ColoredButton
      text={text}
      onPress={onPress}
      color={theme.text}
      backgroundColor={theme.box}
    />
  );
};

export default SecondaryButton;
