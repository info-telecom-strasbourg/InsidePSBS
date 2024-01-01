import COLORS from "constants/colors";

import Button, { ButtonPropsType } from "./Button";

const PrimaryButton = ({
  text,
  onPress,
  style,
  textStyle,
}: ButtonPropsType) => {
  return (
    <Button
      text={text}
      onPress={onPress}
      style={{ backgroundColor: COLORS.primary, ...style }}
      textStyle={{ color: COLORS.white, ...textStyle }}
    />
  );
};

export default PrimaryButton;
