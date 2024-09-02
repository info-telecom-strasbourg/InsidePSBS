import { colors } from "@/theme/colors";
import Toast from "react-native-root-toast";

export const toastSuccess = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    backgroundColor: colors.green,
  });
};

export const toastError = (error: unknown) => {
  Toast.show(
    error instanceof Error ? error.message : "Une erreur est survenue",
    {
      duration: Toast.durations.LONG,
      backgroundColor: colors.red,
    }
  );
};
