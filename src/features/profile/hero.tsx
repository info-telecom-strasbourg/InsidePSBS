import { Typography } from "@/components/primitives/typography";
import { Image, View } from "react-native";

type HeroProps = {
  avatar: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
};

const Hero = ({ avatar, title, subtitle }: HeroProps) => {
  return (
    <View className="flex-row items-center gap-4">
      <Image
        source={{ uri: avatar || undefined }}
        className="size-24"
        style={{ borderRadius: 100000 }}
      />
      <View className="justify-center gap-1 text-wrap">
        <Typography size="h2" fontWeight="semibold">
          {title}
        </Typography>
        <Typography size="h3" className="text-muted-foreground">
          {subtitle}
        </Typography>
      </View>
    </View>
  );
};

export default Hero;
