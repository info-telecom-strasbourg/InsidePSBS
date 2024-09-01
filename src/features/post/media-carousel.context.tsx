import type { SinglePostData } from "@/schemas/post/post.schema";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

type MediaCarouselType = {
  isMediaCarouselOpen: boolean;
  medias: SinglePostData["data"]["medias"];
};

export type UpdateMediaCarouselType = <T extends keyof MediaCarouselType>(
  key: T,
  value: MediaCarouselType[T]
) => void;

const defaultValues = {
  isMediaCarouselOpen: false,
  medias: [],
  updateMediaCarousel: () => {},
};

const MediaCarouselContext = createContext<
  MediaCarouselType & {
    updateMediaCarousel: UpdateMediaCarouselType;
  }
>(defaultValues);

export const useMediaCarousel = () => {
  return useContext(MediaCarouselContext);
};

export const MediaCarouselProvider = ({ children }: PropsWithChildren) => {
  const [mediaCarousel, setMediaCarousel] =
    useState<MediaCarouselType>(defaultValues);

  const updateMediaCarousel: UpdateMediaCarouselType = (key, value) => {
    setMediaCarousel((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <MediaCarouselContext.Provider
      value={{ ...mediaCarousel, updateMediaCarousel }}
    >
      {children}
    </MediaCarouselContext.Provider>
  );
};
