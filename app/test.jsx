import React, { useEffect, useRef, useState } from "react";
import { ScreenContainer } from "../components";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { PermissionsAndroid, Text } from "react-native";
import { text_styles } from "../styles";
import { useTheme } from "../contexts";

const Test = () => {
  const { theme } = useTheme();
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");

      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA),
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        };
    })();
  }, []);

  if (hasCameraPermission === undefined)
    return (
      <ScreenContainer>
        <Text style={text_styles.body3(theme)}>Requesting Permission ...</Text>
      </ScreenContainer>
    );

  if (!hasCameraPermission)
    return (
      <ScreenContainer>
        <Text style={text_styles.body3(theme)}>
          Permission for camera not granted
        </Text>
      </ScreenContainer>
    );
  return (
    <ScreenContainer>
      <Camera></Camera>
    </ScreenContainer>
  );
};

export default Test;
