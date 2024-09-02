import type { DefaultImagesData } from "@/schemas/settings/default-images.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import type * as ImagePicker from "expo-image-picker";
import { forwardRef, useMemo } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export const DefaultImagePickerModal = forwardRef<
  BottomSheetModal,
  {
    data: DefaultImagesData["data"] | undefined;
    setSelectedDefault: React.Dispatch<
      React.SetStateAction<DefaultImagesData["data"][0] | null>
    >;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setProfilePicture: React.Dispatch<
      React.SetStateAction<ImagePicker.ImagePickerAsset | null>
    >;
  }
>(function DefaultImagePickerModal(
  { data, setSelectedDefault, setIsModalOpen, setProfilePicture },
  ref
) {
  const { theme } = useTheme();

  const snapPoints = useMemo(() => ["80%"], []);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

  if (!data) {
    return null;
  }

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDismissOnClose
      overDragResistanceFactor={1}
      backgroundStyle={{ backgroundColor: colors[theme].background }}
      backdropComponent={() => (
        <BottomSheetBackdrop
          pressBehavior={"close"}
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetScrollView
        className="flex-1 p-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 flex-1 flex-row flex-wrap items-center justify-center">
          {data.map((image, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="aspect-square w-1/2 p-1"
                onPress={() => {
                  setSelectedDefault(image);
                  setProfilePicture(null);
                  setIsModalOpen(false);
                }}
              >
                <Image
                  source={{ uri: image.path }}
                  key={index}
                  className="size-full"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});
