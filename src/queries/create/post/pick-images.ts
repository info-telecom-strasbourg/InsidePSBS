import * as ImagePicker from "expo-image-picker";

export const pickImages = async (
  setMedias: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerSuccessResult["assets"] | null>
  >
) => {
  await ImagePicker.requestMediaLibraryPermissionsAsync();

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: true,
    exif: false,
    selectionLimit: 5,
    quality: 1,
    mediaTypes: ImagePicker.MediaTypeOptions.All,
  });

  if (!result.canceled) {
    setMedias((prev) =>
      Array.isArray(prev) ? [...prev, ...result.assets] : result.assets
    );
  } else {
    alert("You did not select any image.");
  }
};
