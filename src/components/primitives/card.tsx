import type { LucideIcon } from "lucide-react-native";
import { type PropsWithChildren } from "react";
import type { TouchableOpacityProps } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "./typography";

export type CardProps = PropsWithChildren<
  {
    subtitle?: string;
    icon: LucideIcon;
    color: string;
    backgroundColor: string;
  } & TouchableOpacityProps
>;

const Card = ({
  subtitle,
  icon: Icon,
  color = "red",
  backgroundColor,
  children,
  ...props
}: CardProps) => {
  return (
    <TouchableOpacity
      className="flex-1 flex-row items-center justify-between rounded-2xl bg-popover p-3"
      {...props}
    >
      <View
        style={{ backgroundColor: backgroundColor }}
        className="size-16 items-center justify-center rounded-2xl"
      >
        <Icon strokeWidth={1.5} size={35} color={color} />
      </View>
      <View className="w-24 items-start justify-center">
        <Typography size="h4" fontWeight="semibold" className="text-foreground">
          {children}
        </Typography>
        {subtitle && (
          <Typography size="p" className="text-muted-foreground">
            {subtitle}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
