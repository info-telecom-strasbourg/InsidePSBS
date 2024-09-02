import type { StoreDefaultImageData } from "@/schemas/settings/default-images.schema";
import {
  StoreDefaultImageSchema,
  type DefaultImagesData,
} from "@/schemas/settings/default-images.schema";
import { postQuery } from "@/utils/post-query";

export const storeDefaultImage = async ({
  image,
  token,
}: {
  image: DefaultImagesData["data"][0];
  token: string | null;
}) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/avatar/default`;
  try {
    const res = await postQuery<StoreDefaultImageData>(
      url,
      token,
      { default_link: image.path, default_name: image.name },
      StoreDefaultImageSchema
    );

    return res;
  } catch (error) {
    console.error(error);
  }
};
