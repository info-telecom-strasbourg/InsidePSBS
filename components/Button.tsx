import { PlusIcon } from "assets/icons";
import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import { useTheme } from "contexts/themeContext";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
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

export const PrimaryButton = ({
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

export const SecondaryButton = ({
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

export const PlusButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: 50,
          height: 50,
          bottom: 21,
          right: 11,
        },
        props.style,
      ]}
      {...props}>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}>
        <PlusIcon color={COLORS.white} height={21} width={21} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
