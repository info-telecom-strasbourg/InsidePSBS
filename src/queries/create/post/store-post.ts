import {
  StorePostCategoriesSchema,
  StorePostSchema,
} from "@/schemas/create/event/store-post.schema";
import { zodFetchWithToken } from "@/utils/fetch";
import type * as ImagePicker from "expo-image-picker";

export const storePost = async (
  postBody: string,
  organizationId: number | null,
  uploadedAt: string | null,
  token: string | null
) => {
  return await zodFetchWithToken("api/contents", token, {
    data: {
      create_post: 1,
      body: postBody,
      organization_id: organizationId,
      uploaded_at: uploadedAt,
    },
    method: "POST",
    schema: StorePostSchema,
  });
};

export const storePostCategories = async (
  postId: number,
  categories: number[],
  token: string | null,
  eventId?: number
) => {
  const url = "api/categories";
  return await zodFetchWithToken(url, token, {
    data: {
      post_id: postId,
      event_id: eventId,
      category_ids: categories,
    },
    method: "POST",
    schema: StorePostCategoriesSchema,
  });
};

export const storeMedias = async (
  postId: number,
  files: ImagePicker.ImagePickerAsset[],
  token: string | null
) => {
  const url = `api/post/${postId}/media`;

  const formData = new FormData();
  files.forEach(async (file, index) => {
    const fileObject = {
      uri: file.uri,
      name: file.fileName || `${file.type}_${index}`,
      type: file.mimeType || "image/jpeg",
    };

    formData.append("medias[]", fileObject, fileObject.name);
  });

  return await zodFetchWithToken(url, token, {
    method: "POST",
    body: formData,
  });
};
