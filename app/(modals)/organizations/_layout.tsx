import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Stack } from "expo-router";

export default function AssoLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors[theme].background },
      }}
    />
  );
}
