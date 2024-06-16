import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import { Typography } from "../../components/primitives/typography";

export type TabIconProps = { focused: boolean; name: string; icon: LucideIcon };

export const TabIcon = ({ focused, icon: Icon, name }: TabIconProps) => {
  const { theme } = useTheme();

  return (
    <View className="flex flex-col items-center gap-2">
      <Icon
        size={22}
        color={cn(focused ? colors[theme].primary : colors[theme].foreground)}
      />
      <Typography
        className={cn(focused ? "text-primary" : "text-foreground", "text-xs")}
        fontWeight="semibold"
      >
        {name}
      </Typography>
    </View>
  );
};
