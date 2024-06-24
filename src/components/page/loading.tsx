import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { ActivityIndicator, View } from "react-native";

export const PageLoading = () => {
  const { theme } = useTheme();
  return (
    <View className="size-full flex-1 items-center justify-center bg-background pb-24">
      <ActivityIndicator size={64} color={colors[theme].foreground} />
    </View>
  );
};
