import { useCreatePost } from "@/contexts/create-post.context";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useDatePickerTheme } from "@app/(modals)/create/event/_features/useDateRangeTheme";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { forwardRef, useMemo } from "react";
import { useSharedValue } from "react-native-reanimated";

export const DatePicker = forwardRef<
  BottomSheetModal,
  {
    today: Date;
  }
>(function DatePicker({ today }, ref) {
  const { theme } = useTheme();
  const { updatePostInfo } = useCreatePost();

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
      bottomInset={30}
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
      <Calendar.List
        // CalendarScrollComponent={FlashList}
        calendarFirstDayOfWeek="monday"
        calendarFormatLocale="fr-FR"
        calendarMinDateId={toDateId(today)}
        calendarInitialMonthId={toDateId(today)}
        onCalendarDayPress={(dateId) => {
          updatePostInfo("uploadedAt", dateId);
        }}
        theme={datePickerTheme}
      />
    </BottomSheetModal>
  );
});
