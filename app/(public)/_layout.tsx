import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Stack } from "expo-router";

export default function PublicLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors[theme].background },
      }}
    />
  );
}
