import { format } from "date-fns";
import { useState } from "react";

export const useTimePicker = (today: Date) => {
  const [time, setTime] = useState<Date>(today);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const formattedTime = format(time, "HH:mm");

  return {
    time,
    setTime,
    showTimePicker,
    setShowTimePicker,
    formattedTime,
  };
};
