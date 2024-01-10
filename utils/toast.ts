import COLORS from "constants/colors";
import Toast from "react-native-root-toast";

const toast = (
  text: string,
  {
    backgroundColor,
    textColor,
  }: { backgroundColor: string; textColor: string },
) => {
  Toast.show(text, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    hideOnPress: true,
    backgroundColor,
    textColor,
    opacity: 1,
  });
};

export const errorToast = (text: string) => {
  toast(text, { backgroundColor: COLORS.dark_red, textColor: COLORS.white });
};

export const successToast = (text: string) => {
  toast(text, { backgroundColor: COLORS.dark_green, textColor: COLORS.white });
};

export const infoToast = (text: string) => {
  toast(text, { backgroundColor: COLORS.dark_blue, textColor: COLORS.white });
};

export const warningToast = (text: string) => {
  toast(text, { backgroundColor: COLORS.dark_yellow, textColor: COLORS.white });
};

export default toast;
