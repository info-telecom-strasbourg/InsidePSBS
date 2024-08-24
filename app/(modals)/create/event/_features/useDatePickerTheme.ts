import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { CalendarTheme } from "@marceloterreiro/flash-calendar";

export const useDatePickerTheme = () => {
  const { theme } = useTheme();

  const datePickerTheme: CalendarTheme = {
    rowMonth: {
      content: {
        textAlign: "center",
        color: colors[theme].foreground,
        fontFamily: "SpaceGrotesk-bold",
      },
    },
    rowWeek: {
      container: {},
    },
    itemWeekName: {
      content: {
        color: colors[theme].mutedForeground,
        fontFamily: "SpaceGrotesk-semibold",
      },
    },
    itemDayContainer: {
      activeDayFiller: {
        backgroundColor: colors[theme].primary,
      },
    },
    itemDay: {
      base: () => ({
        container: {
          padding: 0,
          borderTopRightRadius: 999,
          borderBottomRightRadius: 999,
          borderTopLeftRadius: 999,
          borderBottomLeftRadius: 999,
          backgroundColor: colors[theme].popover,
        },
        content: {
          color: colors[theme].foreground,
          fontFamily: "SpaceGrotesk-medium",
        },
      }),
      disabled: () => ({
        container: {
          opacity: 0.4,
        },
      }),
      today: () => ({
        container: {
          borderColor: "#000000",
          borderWidth: 2,
        },
      }),
      active: ({ isEndOfRange, isStartOfRange }) => ({
        container: {
          backgroundColor: colors[theme].primary,
          borderTopLeftRadius: isStartOfRange ? 999 : 0,
          borderBottomLeftRadius: isStartOfRange ? 999 : 0,
          borderTopRightRadius: isEndOfRange ? 999 : 0,
          borderBottomRightRadius: isEndOfRange ? 999 : 0,
        },
        content: {
          color: "#ffffff",
          fontFamily: "SpaceGrotesk-medium",
        },
      }),
    },
  };
  return datePickerTheme;
};
