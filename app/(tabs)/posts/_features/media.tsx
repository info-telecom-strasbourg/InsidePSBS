import * as VideoThumbnails from "expo-video-thumbnails";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import type { SinglePostData } from "./post.schema";

export const generateThumbnail = async ({ mediaURL }: { mediaURL: string }) => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(mediaURL, {
      time: 3000,
      quality: 1,
    });
    return uri;
  } catch (e) {
    console.warn(e);
  }
};

export const Media = ({
  media,
}: {
  media: SinglePostData["data"]["medias"][0];
}) => {
  const [thumbnailUri, setThumbnailUri] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchThumbnail = async () => {
      const uri = await generateThumbnail({ mediaURL: media.url });
      setThumbnailUri(uri);
    };

    if (media.type === "video") {
      fetchThumbnail();
    }
  }, [media]);

  if (media.type === "image" || thumbnailUri) {
    const uri = media.type === "image" ? media.url : thumbnailUri;
    return (
      <Image source={{ uri }} resizeMode="cover" className="h-28 w-full" />
    );
  }
};
