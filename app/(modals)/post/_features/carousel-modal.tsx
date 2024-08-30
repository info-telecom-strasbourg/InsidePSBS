import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Media } from "@app/(tabs)/posts/_features/media";
import { FlashList } from "@shopify/flash-list";
import { X } from "lucide-react-native";
import { Modal, Pressable, useWindowDimensions, View } from "react-native";
import { useMediaCarousel } from "./media-carousel.context";

export const CarouselModal = () => {
  const { updateMediaCarousel, isMediaCarouselOpen, medias } =
    useMediaCarousel();

  const { width, height } = useWindowDimensions();

  const { theme } = useTheme();
  return (
    <Modal
      visible={isMediaCarouselOpen}
      transparent
      animationType="slide"
      hardwareAccelerated
      onRequestClose={() => updateMediaCarousel("isMediaCarouselOpen", false)}
    >
      <Pressable
        onPress={() => updateMediaCarousel("isMediaCarouselOpen", false)}
        className="flex-1 items-center justify-center"
      >
        {/* <View className="absolute -z-50 size-full bg-background opacity-80" /> */}
        <View className="flex-1 p-4">
          <View className="flex-row justify-end">
            <X color={colors[theme].foreground} size={40} />
          </View>
          <View className="flex-row">
            <FlashList
              data={medias}
              estimatedItemSize={500}
              className="z-50"
              renderItem={({ item, index }) => (
                <Media
                  media={item}
                  key={index}
                  width={width}
                  height={height}
                  resizeMode="contain"
                />
              )}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
