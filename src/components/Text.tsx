import FONTS from "@/constants/fonts";
import { useTheme } from "@/contexts/ThemeContext";
import type { PropsWithChildren } from "react";
import { Text, type TextProps } from "react-native";

export const Title1 = ({
  children,
  style,
  ...props
}: PropsWithChildren<TextProps>) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.text,
        fontSize: 30,
        fontFamily: FONTS.OpenSans.bold,
        lineHeight: 41,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Title2 = ({
  children,
  style,
  ...props
}: PropsWithChildren<TextProps>) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.text,
        fontSize: 25,
        fontFamily: FONTS.OpenSans.bold,
        lineHeight: 34,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Title3 = ({
  children,
  style,
  ...props
}: PropsWithChildren<TextProps>) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.text,
        fontSize: 20,
        fontFamily: FONTS.OpenSans.bold,
        lineHeight: 27,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Title4 = ({
  children,
  style,
  ...props
}: PropsWithChildren<TextProps>) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.text,
        fontSize: 20,
        fontFamily: FONTS.OpenSans.semiBold,
        lineHeight: 27,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Body1 = ({
  children,
  style,
  ...props
}: PropsWithChildren<TextProps>) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.text,
        fontSize: 18,
        fontFamily: FONTS.OpenSans.regular,
        lineHeight: 25,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Body2 = ({
  children,
  style,
  ...props
}: PropsWithChildren<TextProps>) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.text,
        fontSize: 16,
        fontFamily: FONTS.OpenSans.regular,
        lineHeight: 22,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Body3 = ({
  children,
  style,
  ...props
}: PropsWithChildren<TextProps>) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: theme.text,
        fontSize: 15,
        fontFamily: FONTS.OpenSans.regular,
        lineHeight: 20,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};
