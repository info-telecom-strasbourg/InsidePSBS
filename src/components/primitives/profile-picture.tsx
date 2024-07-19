import { Image, View } from "react-native";
import { Typography } from "./typography";

export const ProfilePicture = ({
  avatar,
  name,
  isOrganization,
  imageSize = 20,
}: {
  avatar: string | undefined | null;
  name: string;
  isOrganization: boolean;
  imageSize: number;
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
          className={`items-center justify-center rounded-full bg-background`}
          style={{ width: imageSize, height: imageSize }}
        >
          <Typography size="h3" fontWeight="semibold">
            {name[0].toUpperCase()}
          </Typography>
        </View>
      );
    } else {
      const str1 = name.split(" ")[0];
      const str2 = name.split(" ")[1];
      return (
        <View
          className={`items-center justify-center rounded-full bg-background`}
          style={{ width: imageSize, height: imageSize }}
        >
          <Typography size="h3" fontWeight="semibold">
            {str1[0].toUpperCase() + str2[0].toUpperCase()}
          </Typography>
        </View>
      );
    }
  }
};
