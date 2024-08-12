import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Calendar,
  toDateId,
  useDateRange,
} from "@marceloterreiro/flash-calendar";
import { FlashList } from "@shopify/flash-list";
import { forwardRef, useMemo } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useDatePickerTheme } from "./useDateRangeTheme";

export const DateRangePicker = forwardRef<BottomSheetModal, { today: Date }>(
  function DateRangePicker({ today }, ref) {
    const { theme } = useTheme();
    const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange();

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
        <View className="mb-3 border-b-2 border-muted-foreground pb-3">
          <Typography size="h2" fontWeight="bold">
            Dates de l'évènement
          </Typography>
        </View>
        <Calendar.List
          CalendarScrollComponent={FlashList}
          calendarFirstDayOfWeek="monday"
          calendarActiveDateRanges={calendarActiveDateRanges}
          calendarFormatLocale="fr-FR"
          calendarMinDateId={toDateId(today)}
          calendarInitialMonthId={toDateId(today)}
          onCalendarDayPress={onCalendarDayPress}
          theme={datePickerTheme}
        />
      </BottomSheetModal>
    );
  }
);
