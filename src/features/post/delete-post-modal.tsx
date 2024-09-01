import { Button } from "@/components/primitives/button";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useDeletePost } from "./delete-post.context";

export const DeletePostModal = () => {
  const deletePostModalRef = useRef<BottomSheetModal>(null);
  const { theme } = useTheme();
  const { updateDeletePost, isDeletePostModalOpen } = useDeletePost();

  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = useMemo(() => ["20%"], []);

  useEffect(() => {
    if (isDeletePostModalOpen) {
      deletePostModalRef?.current?.present();
    } else {
      deletePostModalRef?.current?.dismiss();
    }
  }, [isDeletePostModalOpen]);
  return (
    <BottomSheetModal
      ref={deletePostModalRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDismissOnClose
      overDragResistanceFactor={1}
      backgroundStyle={{ backgroundColor: colors[theme].background }}
      backdropComponent={() => (
        <BottomSheetBackdrop
          // pressBehavior={"close"}
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          onPress={() => updateDeletePost("isDeletePostModalOpen", false)}
        />
      )}
    >
      <View className="flex-1 justify-center px-4">
        <Typography fontWeight="semibold" size="h4" className="mb-3">
          Êtes-vous sûr(e) de vouloir supprimer ce post ?
        </Typography>
        <View className="flex-row items-center justify-between gap-6">
          <View className="flex-1">
            <Button
              variant={"destructive"}
              onPress={() => updateDeletePost("isDeletePostModalOpen", false)}
            >
              Non
            </Button>
          </View>
          <View className="flex-1">
            <Button
              onPress={() => {
                updateDeletePost("confirmDelete", true);
                updateDeletePost("isDeletePostModalOpen", false);
              }}
            >
              Oui
            </Button>
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
};
