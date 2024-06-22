import { cn } from "@/utils/cn";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";
import type { TypographyProps } from "./typography";
import { Typography } from "./typography";

export type LinkProps = PropsWithChildren<{
  href?: string;
  className?: string;
  onPress?: () => void;
}> &
  TypographyProps;

export const Link = ({
  children,
  onPress,
  href,
  className,
  ...props
}: LinkProps) => {
  const router = useRouter();
  const handlePress = onPress || (() => router.push(href || "/"));
  return (
    <TouchableOpacity onPress={handlePress}>
      <Typography size="p" {...props} className={cn("text-primary", className)}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};
