import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useEffect, useState } from "react";
import type { ImageProps } from "react-native";
import { ActivityIndicator, Image } from "react-native";
import type { SinglePostData } from "./post.schema";

type MediaProps = { media: SinglePostData["data"]["medias"][0] } & ImageProps;

export const generateThumbnail = async ({ mediaURL }: { mediaURL: string }) => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(mediaURL, {
      time: 0,
      quality: 1,
    });
    return uri;
  } catch (e) {
    console.warn(e);
  }
};

export const Media = ({ media, ...props }: MediaProps) => {
  const { theme } = useTheme();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchThumbnail = async () => {
      const uri = await generateThumbnail({ mediaURL: media.url });
      setImageUri(uri);
    };

    if (media) {
      if (media.type === "video") {
        fetchThumbnail();
      } else {
        setImageUri(media.url);
      }
    }
  }, [media]);
  if (media.url && imageUri) {
    return <Image source={{ uri: imageUri }} resizeMode="cover" {...props} />;
  } else {
    return <ActivityIndicator color={colors[theme].foreground} {...props} />;
  }
};
