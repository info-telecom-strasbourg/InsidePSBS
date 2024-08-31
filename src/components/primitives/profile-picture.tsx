import { cn } from "@/utils/cn";
import { Image, View } from "react-native";
import { Typography } from "./typography";

export const ProfilePicture = ({
  avatar,
  name,
  isOrganization,
  imageSize = 20,
  color,
  textClassName,
}: {
  avatar: string | undefined | null;
  name: string;
  isOrganization: boolean;
  imageSize: number;
  color: string;
  textClassName?: string;
}) => {
  if (avatar) {
    return (
      <Image
        source={{ uri: avatar }}
        className={`rounded-full`}
        width={imageSize}
        height={imageSize}
        resizeMode="cover"
      />
    );
  } else {
    if (isOrganization) {
      return (
        <View
          className={`items-center justify-center`}
          style={{
            width: imageSize,
            height: imageSize,
            backgroundColor: color,
            borderRadius: 999,
          }}
        >
          <Typography
            size="h3"
            fontWeight="semibold"
            className={cn(textClassName, "leading-snug text-center")}
          >
            {name?.[0].toUpperCase()}
          </Typography>
        </View>
      );
    } else {
      const str1 = name?.split(" ")[0];
      const str2 = name?.split(" ")[1];
      return (
        <View
          className={`items-center justify-center rounded-full`}
          style={{
            width: imageSize,
            height: imageSize,
            backgroundColor: color,
          }}
        >
          <Typography
            size="h3"
            fontWeight="semibold"
            className={cn(textClassName, "leading-snug text-center")}
          >
            {str1[0].toUpperCase() + str2[0].toUpperCase()}
          </Typography>
        </View>
      );
    }
  }
};
