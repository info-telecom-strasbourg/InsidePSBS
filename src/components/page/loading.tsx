import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { ActivityIndicator, View } from "react-native";

export const PageLoading = () => {
  const { theme } = useTheme();
  return (
    <View className="flex size-full items-center justify-center pb-24">
      <ActivityIndicator size={64} color={colors[theme].foreground} />
    </View>
  );
};
