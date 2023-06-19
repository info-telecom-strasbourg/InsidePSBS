import { useEffect } from "react";
import { Platform } from "react-native";

const lockScreenOrientation = () => {
  useEffect(() => {
    if (Platform.OS === "web") return;

    const lock = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    lock();
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
};

export default lockScreenOrientation;
