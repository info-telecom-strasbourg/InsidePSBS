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
      disabled: () => ({
        container: {
          backgroundColor: colors[theme].popover,
          borderRadius: 999,
          opacity: 0.4,
        },
        content: {
          color: colors[theme].foreground,
          fontFamily: "SpaceGrotesk-medium",
        },
      }),
      idle: ({ isPressed }) => ({
        container: {
          backgroundColor: isPressed
            ? colors[theme].primary
            : colors[theme].popover,
          borderRadius: 999,
        },
        content: {
          color: isPressed ? "#ffffff" : colors[theme].foreground,
          fontFamily: "SpaceGrotesk-medium",
        },
      }),
      today: ({ isPressed }) => ({
        container: {
          borderColor: "#000000",
          borderWidth: 2,
          borderRadius: 999,
          backgroundColor: isPressed
            ? colors[theme].primary
            : colors[theme].popover,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        },
        content: {
          color: colors[theme].foreground,
          fontFamily: "SpaceGrotesk-medium",
          textAlign: "center",
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
