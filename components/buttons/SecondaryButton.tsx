import { useTheme } from "contexts/themeContext";

import Button, { ButtonPropsType } from "./Button";

const SecondaryButton = ({
  text,
  onPress,
  style,
  textStyle,
}: ButtonPropsType) => {
  const { theme } = useTheme();
  return (
    <Button
      text={text}
      onPress={onPress}
      style={{ backgroundColor: theme.box, ...style }}
      textStyle={{ color: theme.text, ...textStyle }}
    />
  );
};

export default SecondaryButton;
