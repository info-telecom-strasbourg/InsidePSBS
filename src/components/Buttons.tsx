import { ChevronLeftIcon, SettingsIcon } from "@/assets/icons";
import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import type { TextStyle, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  backgroundColor?: string;
  foregroundColor?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
};

export const ColoredButton = ({
  backgroundColor = COLORS.box,
  foregroundColor = COLORS.white,
  buttonStyle,
  textStyle,
  children,
  onPress,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor, padding: 10, borderRadius: 20, ...buttonStyle }}
    >
      <Text
        style={{
          color: foregroundColor,
          textAlign: "center",
          // fontFamily: FONTS.OpenSans.bold,
          fontSize: 20,
          ...textStyle,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const PrimaryButton = ({
  onPress,
  children,
  buttonStyle,
  textStyle,
}: PropsWithChildren<ButtonProps>) => {
  const { theme } = useTheme();
  return (
    <ColoredButton
      onPress={onPress}
      foregroundColor={COLORS.white}
      backgroundColor={theme.primary}
      buttonStyle={buttonStyle}
      textStyle={textStyle}
    >
      {children}
    </ColoredButton>
  );
};

export const SecondaryButton = ({
  onPress,
  children,
  buttonStyle,
  textStyle,
}: PropsWithChildren<ButtonProps>) => {
  const { theme } = useTheme();
  return (
    <ColoredButton
      onPress={onPress}
      foregroundColor={theme.text}
      backgroundColor={theme.box}
      buttonStyle={buttonStyle}
      textStyle={textStyle}
    >
      {children}
    </ColoredButton>
  );
};

export const AlertButton = ({
  onPress,
  children,
  buttonStyle,
  textStyle,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <ColoredButton
      onPress={onPress}
      foregroundColor={COLORS.dark_red}
      backgroundColor={COLORS.light_red}
      buttonStyle={buttonStyle}
      textStyle={textStyle}
    >
      {children}
    </ColoredButton>
  );
};

export const ConfirmButton = ({
  onPress,
  children,
  buttonStyle,
  textStyle,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <ColoredButton
      onPress={onPress}
      foregroundColor={COLORS.dark_green}
      backgroundColor={COLORS.light_green}
      buttonStyle={buttonStyle}
      textStyle={textStyle}
    >
      {children}
    </ColoredButton>
  );
};

export const SettingsButton = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/settings/")}
      style={style.iconContainer}
    >
      <SettingsIcon width={28} height={28} color={theme.text} />
    </TouchableOpacity>
  );
};

export const BackButton = () => {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={style.iconContainer}>
      <ChevronLeftIcon width={13} height={24} color={theme.text} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
