import type { StoreDefaultImageData } from "@/schemas/settings/default-images.schema";
import {
  StoreDefaultImageSchema,
  type DefaultImagesData,
} from "@/schemas/settings/default-images.schema";
import { zodFetchWithToken } from "@/utils/fetch";

export const storeDefaultImage = async ({
  image,
  token,
}: {
  image: DefaultImagesData["data"][0];
  token: string | null;
}) => {
  const url = "api/user/avatar/default";
  return await zodFetchWithToken<StoreDefaultImageData>(url, token, {
    data: { default_link: image.path, default_name: image.name },
    schema: StoreDefaultImageSchema,
    method: "POST",
  });
};
