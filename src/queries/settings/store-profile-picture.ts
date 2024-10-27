import { zodFetchWithToken } from "@/utils/fetch";
import type * as ImagePicker from "expo-image-picker";

export const storeProfilePicture = async ({
  file,
  token,
}: {
  file: ImagePicker.ImagePickerAsset;
  token: string | null;
}) => {
  const url = "api/user/avatar";

  const formData = new FormData();
  const fileObject = {
    uri: file.uri,
    name: file.fileName || `${file.type}`,
    type: file.mimeType,
  };

  formData.append("avatar", fileObject, fileObject.name);
  return await zodFetchWithToken(url, token, {
    body: formData,
    method: "POST",
  });
};
