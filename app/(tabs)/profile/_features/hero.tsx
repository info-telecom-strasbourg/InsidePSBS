import { Typography } from "@/components/primitives/typography";
import { Image, View } from "react-native";

type HeroProps = {
  avatar: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
};

export const ProfileHero = ({ avatar, title, subtitle }: HeroProps) => {
  return (
    <View className="flex-row items-center gap-4">
      <Image
        source={{ uri: avatar || undefined }}
        className="size-24 rounded-full"
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
