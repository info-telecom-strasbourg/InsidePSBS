import { colors } from "@/theme/colors";
import Toast from "react-native-root-toast";

export const toastSuccess = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    backgroundColor: colors.green,
  });
};

export const toastError = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    backgroundColor: colors.red,
  });
};
