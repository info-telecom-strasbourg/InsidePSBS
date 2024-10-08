import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import { useModalRouter } from "@/hooks/useModalRouter";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useRouter } from "expo-router";
import { Bell, ChevronLeft, Settings, X } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";

export type HeaderProps = {
  leftIcon?: "inside-psbs" | "back";
  rightIcon?: "notifications" | "close" | "settings";
  title: string;
};

export const Header = ({ rightIcon, title, leftIcon }: HeaderProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const modalRouter = useModalRouter();
  return (
    <View className="mb-4 flex flex-row items-center gap-5">
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
      {!leftIcon && <View />}
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
      {rightIcon === "notifications" && (
        <TouchableOpacity
          onPress={() => modalRouter.open(routes.settings)}
          className="p-2"
        >
          <Bell size={32} color={colors[theme].foreground} />
        </TouchableOpacity>
      )}
      {rightIcon === "settings" && (
        <TouchableOpacity
          onPress={() => modalRouter.open(routes.settings)}
          className="p-2"
        >
          <Settings size={32} color={colors[theme].foreground} />
        </TouchableOpacity>
      )}
    </View>
  );
};
