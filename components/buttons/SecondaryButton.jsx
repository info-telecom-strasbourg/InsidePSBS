import React from "react";

import ColoredButton from "./ColoredButton";
import { useTheme } from "../../contexts";

const SecondaryButton = ({ text, onPress }) => {
  const { theme } = useTheme();

  return (
    <ColoredButton
      text={text}
      onPress={onPress}
      foreground={theme.text}
      background={theme.box}
    />
  );
};

export default SecondaryButton;
