import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";

export type HeaderProps = {
  leftIcon?: "none" | "inside-psbs" | "back";
  rightIcon?: "none" | "settings" | "close";
  title: string;
};

export const Header = ({
  rightIcon = "none",
  title,
  leftIcon = "none",
}: HeaderProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <View className="mb-5 flex flex-row items-center gap-5">
      {leftIcon === "inside-psbs" && (
        <Image
          source={require("assets/images/favicon.png")}
          className="size-16"
        />
      )}
      <Typography
        size="h3"
        fontWeight="bold"
        className="flex-1"
        numberOfLines={1}
      >
        {title}
      </Typography>
      {rightIcon === "close" && (
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <X size={32} color={colors[theme].foreground} />
        </TouchableOpacity>
      )}
    </View>
  );
};
