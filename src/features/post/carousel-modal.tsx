import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { useMediaCarousel } from "./media-carousel.context";

export const CarouselModal = () => {
  const { updateMediaCarousel, isMediaCarouselOpen, medias } =
    useMediaCarousel();

  const [currentMedia, setCurrentMedia] = useState(0);
  const incrementMedia = () => {
    setCurrentMedia((prev) => (prev === medias.length - 1 ? 0 : prev + 1));
  };
  const decrementMedia = () => {
    setCurrentMedia((prev) => (prev === 0 ? medias.length - 1 : prev - 1));
  };
  const closeCarousel = () => {
    setCurrentMedia(0);
    updateMediaCarousel("isMediaCarouselOpen", false);
  };

  return (
    <Modal
      visible={isMediaCarouselOpen}
      transparent
      animationType="fade"
      hardwareAccelerated
      onRequestClose={closeCarousel}
    >
      <Pressable
        className="size-full flex-1 flex-row items-center justify-between bg-[#000000aa]"
        onPress={closeCarousel}
      >
        <Image
          source={{ uri: medias[currentMedia]?.url || "" }}
          width={400}
          height={400}
          className="absolute size-full flex-1"
          resizeMode="contain"
        />
        <CarouselArrow
          onPress={decrementMedia}
          direction="left"
          hidden={medias.length <= 1}
        />
        <CarouselArrow
          onPress={incrementMedia}
          direction="right"
          hidden={medias.length <= 1}
        />
      </Pressable>
    </Modal>
  );
};

const CarouselArrow = ({
  onPress,
  direction,
  hidden,
}: {
  onPress: () => void;
  direction: "left" | "right";
  hidden?: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn("h-full justify-center", hidden && "hidden")}
    >
      <View className="mx-2 rounded-full bg-popover p-2">
        {direction === "left" ? (
          <ChevronLeft size={32} color={colors[theme].foreground} />
        ) : (
          <ChevronRight size={32} color={colors[theme].foreground} />
        )}
      </View>
    </TouchableOpacity>
  );
};
