import ImageResizer from "@bam.tech/react-native-image-resizer";
const resizeImage = async () => {
    if (!imageUri) return;

    setResizedImage(null);

    try {
        const result = await ImageResizer.createResizedImage(
            imageUri,
      sizeTarget,
      sizeTarget,
            "JPEG",
      100,
            0,
      undefined,
            false,
      {
                mode: selectedMode,
                onlyScaleDown,
            },
    );

    return result;
    } catch (error) {
    Alert.alert("Unable to resize the photo");
    }
};
