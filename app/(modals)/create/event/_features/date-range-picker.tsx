import { SafeFlashList } from "@/components/primitives/bottom-sheet-flashlist";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Calendar,
  toDateId,
  useDateRange,
} from "@marceloterreiro/flash-calendar";
import { forwardRef, useEffect, useMemo } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useDatePickerTheme } from "./useDatePickerTheme";

export const DateRangePicker = forwardRef<
  BottomSheetModal,
  {
    today: Date;
    setStartAt: React.Dispatch<React.SetStateAction<string>>;
    setEndAt: React.Dispatch<React.SetStateAction<string>>;
  }
>(function DateRangePicker({ today, setStartAt, setEndAt }, ref) {
  const { theme } = useTheme();
  const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange();

  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = useMemo(() => ["80%"], []);

  const datePickerTheme = useDatePickerTheme();
  useEffect(() => {
    if (calendarActiveDateRanges[0]) {
      if (
        calendarActiveDateRanges[0].startId &&
        calendarActiveDateRanges[0].endId
      ) {
        setStartAt(calendarActiveDateRanges[0].startId || "");
        setEndAt(calendarActiveDateRanges[0].endId || "");
      }
    }
  }, [calendarActiveDateRanges, setStartAt, setEndAt]);

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
      <View className="mb-3 border-b-2 border-muted-foreground pb-3">
        <Typography size="h2" fontWeight="bold">
          Dates de l'évènement
        </Typography>
      </View>
      <View className="flex-1">
        <Calendar.List
          CalendarScrollComponent={SafeFlashList}
          calendarFirstDayOfWeek="monday"
          calendarActiveDateRanges={calendarActiveDateRanges}
          calendarFormatLocale="fr-FR"
          calendarMinDateId={toDateId(today)}
          calendarInitialMonthId={toDateId(today)}
          onCalendarDayPress={onCalendarDayPress}
          theme={datePickerTheme}
        />
      </View>
    </BottomSheetModal>
  );
});
