import { Typography } from "@/components/primitives/typography";
import { View } from "react-native";

export type SettingsTitleProps = {
  label: string;
};

export const SettingsTitle = ({ label }: SettingsTitleProps) => {
  return (
    <View className="flex-row items-center gap-2">
      <Typography size="h3" fontWeight="bold">
        {label}
      </Typography>
    </View>
  );
};
