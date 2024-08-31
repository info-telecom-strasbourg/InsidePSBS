import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { LucideIcon } from "lucide-react-native";
import type { PropsWithChildren } from "react";
import { Switch, TouchableHighlight, View } from "react-native";

export type SettingsButtonPrimitiveProps = PropsWithChildren<{
  onPress: () => void;
}>;

export const SettingButtonPrimitive = ({
  children,
  onPress,
}: SettingsButtonPrimitiveProps) => {
  const { theme } = useTheme();

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors[theme].foreground}
      className="overflow-hidden rounded-lg"
    >
      <View className="w-full flex-row items-center gap-6 bg-background p-4">
        {children}
      </View>
    </TouchableHighlight>
  );
};

export type SettingsButtonProps = {
  label: string;
  subtitle?: string;
  icon?: LucideIcon;
  onPress: () => void;
};

export const SettingsButton = ({
  label,
  subtitle,
  icon: Icon,
  onPress,
}: SettingsButtonProps) => {
  const { theme } = useTheme();
  return (
    <SettingButtonPrimitive onPress={onPress}>
      {Icon && <Icon color={colors[theme].foreground} size={28} />}
      <View>
        <Typography size="h4" fontWeight="semibold">
          {label}
        </Typography>
        {subtitle && (
          <Typography size="p" className="text-muted-foreground">
            {subtitle}
          </Typography>
        )}
      </View>
    </SettingButtonPrimitive>
  );
};

export type SettingsSwitchProps = {
  label: string;
  icon: LucideIcon;
  active: boolean;
  subtitle?: string;
  toggle: () => void;
};

export const SettingsSwitch = ({
  label,
  subtitle,
  icon: Icon,
  active,
  toggle,
}: SettingsSwitchProps & { active: boolean; toggle: () => void }) => {
  const { theme } = useTheme();
  return (
    <SettingButtonPrimitive onPress={toggle}>
      <Icon color={colors[theme].foreground} size={24} />
      <View>
        <Typography size="h4" fontWeight="semibold">
          {label}
        </Typography>
        {subtitle && (
          <Typography size="p" className="text-muted-foreground">
            {subtitle}
          </Typography>
        )}
      </View>
      <View className="flex-1 items-end">
        <Switch value={active} onValueChange={toggle}></Switch>
      </View>
    </SettingButtonPrimitive>
  );
};
