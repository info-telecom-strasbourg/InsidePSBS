import React from "react";

import ColoredButton from "./ColoredButton";
import { useTheme } from "../../contexts";

const SecondaryButton = ({ text, onPress, style, textStyle }) => {
  const { theme } = useTheme();

  return (
    <ColoredButton
      text={text}
      onPress={onPress}
      foreground={theme.text}
      background={theme.box}
      style={style}
      textStyle={textStyle}
    />
  );
};

export default SecondaryButton;
