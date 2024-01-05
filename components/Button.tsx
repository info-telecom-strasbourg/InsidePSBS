import { PlusIcon } from "assets/icons";
import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import { useTheme } from "contexts/themeContext";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export type ButtonPropsType = TouchableOpacityProps & {
  text: ReactNode;
  textStyle?: StyleProp<TextStyle>;
};

const Button = ({ text, style, textStyle, ...props }: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: COLORS.primary,
          padding: 10,
          borderRadius: 20,
        },
        style,
      ]}
      {...props}>
      <Text
        style={[
          {
            color: COLORS.white,
            textAlign: "center",
            fontFamily: FONTS.OpenSans.bold,
            fontSize: 20,
          },
          textStyle,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const PrimaryButton = ({
  style,
  textStyle,
  ...props
}: ButtonPropsType) => {
  return (
    <Button
      style={[{ backgroundColor: COLORS.primary }, style]}
      textStyle={[{ color: COLORS.white }, textStyle]}
      {...props}
    />
  );
};

export const SecondaryButton = ({
  style,
  textStyle,
  ...props
}: ButtonPropsType) => {
  const { theme } = useTheme();
  return (
    <Button
      style={[{ backgroundColor: theme.box }, style]}
      textStyle={[{ color: theme.text }, textStyle]}
      {...props}
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
