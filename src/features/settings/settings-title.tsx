import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";

export type SettingsTitleProps = {
  label: string;
  icon?: LucideIcon;
  className?: string;
};

export const SettingsTitle = ({
  label,
  icon: Icon,
  className,
}: SettingsTitleProps) => {
  const { theme } = useTheme();
  return (
    <View className={cn("flex-row items-center gap-2", className)}>
      {Icon && <Icon size={20} color={colors[theme].foreground} />}
      <Typography size="h3" fontWeight="bold">
        {label}
      </Typography>
    </View>
  );
};
