import { SafeFlashList } from "@/components/primitives/bottom-sheet-flashlist";
import { useCreatePost } from "@/contexts/create-post.context";
import { useDatePickerTheme } from "@/hooks/create/event/useDatePickerTheme";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { forwardRef, useMemo } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export const DatePicker = forwardRef<
  BottomSheetModal,
  {
    today: Date;
  }
>(function DatePicker({ today }, ref) {
  const { theme } = useTheme();
  const { updatePostInfo, uploadedAt } = useCreatePost();

  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = useMemo(() => ["80%"], []);

  const datePickerTheme = useDatePickerTheme();

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
        ></BottomSheetBackdrop>
      )}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Calendar.List
          CalendarScrollComponent={SafeFlashList}
          calendarFirstDayOfWeek="monday"
          calendarFormatLocale="fr-FR"
          calendarMinDateId={toDateId(today)}
          calendarActiveDateRanges={[
            { startId: uploadedAt, endId: uploadedAt },
          ]}
          calendarInitialMonthId={toDateId(today)}
          onCalendarDayPress={(dateId) => {
            updatePostInfo("uploadedAt", dateId);
          }}
          theme={datePickerTheme}
        />
      </View>
    </BottomSheetModal>
  );
});
