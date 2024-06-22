import { Typography } from "@/components/primitives/typography";
import { useModalRouter } from "@/hooks/useModalRouter";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useRouter } from "expo-router";
import { Bolt, ChevronLeft, X } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";

export type HeaderProps = {
  leftIcon?: "inside-psbs" | "back";
  rightIcon?: "settings" | "close";
  title: string;
};

export const Header = ({ rightIcon, title, leftIcon }: HeaderProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const modalRouter = useModalRouter();
  return (
    <View className="mb-5 flex min-h-16 flex-row items-center gap-5">
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
      {!leftIcon && <View className="px-2" />}
      <Typography
        size="h2"
        fontWeight="bold"
        className="flex-1"
        numberOfLines={1}
      >
        {title}
      </Typography>
      {rightIcon === "close" && (
        <TouchableOpacity onPress={() => modalRouter.close()} className="p-2">
          <X size={32} color={colors[theme].foreground} />
        </TouchableOpacity>
      )}
      {rightIcon === "settings" && (
        <TouchableOpacity
          onPress={() => modalRouter.open("/settings")}
          className="p-2"
        >
          <Bolt size={32} color={colors[theme].foreground} />
        </TouchableOpacity>
      )}
    </View>
  );
};
