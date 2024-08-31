import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { ChevronDown } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export const ChoiceItem = ({
  onPress,
  title,
  url,
  isOrganization,
}: {
  onPress: () => void;
  title: string;
  url: string | null;
  isOrganization: boolean;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity className="flex-row items-center gap-3" onPress={onPress}>
      <ProfilePicture
        isOrganization={isOrganization}
        avatar={url}
        imageSize={55}
        name={title}
        color={colors[theme].popover}
      />
      <Typography size="h4" fontWeight="medium">
        {title}
      </Typography>
      <ChevronDown size={20} color={colors[theme].foreground} />
    </TouchableOpacity>
  );
};
