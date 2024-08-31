import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { useSharedValue } from "react-native-reanimated";

export const DefaultImagePickerModal = forwardRef<BottomSheetModal>(
  function DefaultImagePickerModal(props, ref) {
    const { theme } = useTheme();

    const snapPoints = useMemo(() => ["60%"], []);
    const animatedIndex = useSharedValue<number>(0);
    const animatedPosition = useSharedValue<number>(0);

    return (
      <BottomSheetModal
        style={{
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          margin: 10,
          padding: 20,
        }}
        bottomInset={45}
        ref={ref}
        snapPoints={snapPoints}
        detached={true}
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
        {/* <BottomSheetFlashList /> */}
        {null}
      </BottomSheetModal>
    );
  }
);
