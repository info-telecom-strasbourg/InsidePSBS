import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

const lockScreenOrientation = () => {
  useEffect(() => {
    if (Platform.OS === "web") return;

    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    lockScreenOrientation();
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
};

export default lockScreenOrientation;
