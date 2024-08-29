import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Typography } from "./typography";

export type InputProps = {
  title: string;
  variant?: InputVariant;
} & TextInputProps;

export const Input = ({
  children,
  className,
  title,
  variant = "text",
  ...props
}: InputProps) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  return (
    <View className={"flex flex-col gap-2"}>
      <Typography size="h5">{title}</Typography>
      <View className="flex flex-row items-center rounded-lg bg-secondary">
        <TextInput
          className="flex-1 px-5 py-4 text-lg leading-5 text-foreground"
          secureTextEntry={variant === "password" && !show}
          {...inputProps(variant)}
          {...props}
        />
        {variant === "password" && (
          <TouchableOpacity
            onPress={() => setShow((prev) => !prev)}
            className="pr-5"
          >
            {show ? (
              <Eye color={colors[theme].foreground} />
            ) : (
              <EyeOff color={colors[theme].foreground} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export type InputVariant =
  | "password"
  | "text"
  | "email"
  | "password-confirm"
  | "current-password"
  | "new-password";

export const inputProps = (variant: InputVariant): TextInputProps => {
  switch (variant) {
    case "password":
    case "current-password":
    case "new-password":
      return {
        autoCapitalize: "none",
        keyboardType: "visible-password",
        autoCorrect: false,
        autoComplete: variant,
        textContentType:
          variant === "new-password" ? "newPassword" : "password",
      };
    case "email":
      return {
        autoComplete: "email",
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoCorrect: false,
      };
    default:
      return {
        autoCapitalize: "sentences",
        keyboardType: "default",
        autoCorrect: true,
      };
  }
};
