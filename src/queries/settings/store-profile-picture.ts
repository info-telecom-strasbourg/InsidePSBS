import type * as ImagePicker from "expo-image-picker";

export const storeProfilePicture = async ({
  file,
  token,
}: {
  file: ImagePicker.ImagePickerAsset;
  token: string | null;
}) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/avatar`;

  const formData = new FormData();
  try {
    const fileObject = {
      uri: file.uri,
      name: file.fileName || `${file.type}`,
      type: file.mimeType,
    };

    formData.append("avatar", fileObject, fileObject.name);

    const res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(res, null, 2));
    if (!res.ok) {
      const error = await res.json();
      throw new Error(`HTTP error! status: ${res.status}, message: ${error}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
