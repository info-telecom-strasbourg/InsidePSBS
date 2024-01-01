import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export type ButtonPropsType = {
  text: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button = ({ text, onPress, style, textStyle }: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 20,
        ...style,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: COLORS.white,
          textAlign: "center",
          fontFamily: FONTS.OpenSans.bold,
          fontSize: 20,
          ...textStyle,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
