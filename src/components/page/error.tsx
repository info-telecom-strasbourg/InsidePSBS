import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { CircleAlert } from "lucide-react-native";
import { View } from "react-native";
import { Typography } from "../primitives/typography";

export const PageError = () => {
  const { theme } = useTheme();
  return (
    <View className="flex w-full gap-3 rounded-md border border-destructive px-5 py-3">
      <CircleAlert size={32} color={colors[theme].destructive} />
      <Typography size="p" className="text-foreground">
        Une erreur est survenue. Veuillez réessayer ultérieurement
      </Typography>
    </View>
  );
};
