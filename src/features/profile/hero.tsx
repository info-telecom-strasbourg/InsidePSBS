import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { View } from "react-native";

type HeroProps = {
  avatar: string | undefined | null;
  title: string;
  subtitle: string | undefined;
};

export const ProfileHero = ({ avatar, title, subtitle }: HeroProps) => {
  const { theme } = useTheme();
  return (
    <View className="flex-row items-center gap-4">
      <ProfilePicture
        avatar={avatar}
        imageSize={60}
        isOrganization
        name={title}
        color={colors[theme].popover}
      />
      <View className="flex-1 justify-center gap-1">
        <Typography size="h2" fontWeight="semibold">
          {title}
        </Typography>
        <Typography
          size="h3"
          className="mr-2 line-clamp-1 text-muted-foreground"
        >
          {subtitle}
        </Typography>
      </View>
    </View>
  );
};
