import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useRouter } from "expo-router";
import { Bolt, ChevronLeft, X } from "lucide-react-native";
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
      {leftIcon === "back" && (
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={32} color={colors[theme].foreground} />
        </TouchableOpacity>
      )}
      <Typography
        size="h2"
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
      {rightIcon === "settings" && (
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          className="p-2"
        >
          <Bolt size={32} color={colors[theme].foreground} />
        </TouchableOpacity>
      )}
    </View>
  );
};
