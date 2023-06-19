import { useEffect } from "react";
import { Platform } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

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
