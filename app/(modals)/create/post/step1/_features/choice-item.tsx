import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { ChevronDown } from "lucide-react-native";
import { Image, TouchableOpacity } from "react-native";

export const ChoiceItem = ({
  onPress,
  title,
  url,
}: {
  onPress: () => void;
  title: string;
  url: string;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity className="flex-row items-center gap-3" onPress={onPress}>
      <Image
        source={{
          uri: url,
        }}
        className="size-16 rounded-full"
        resizeMode="cover"
      />
      <Typography size="h4" fontWeight="medium">
        {title}
      </Typography>
      <ChevronDown size={20} color={colors[theme].foreground} />
    </TouchableOpacity>
  );
};
