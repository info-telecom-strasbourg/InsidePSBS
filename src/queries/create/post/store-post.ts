import type {
  StorePostCategoriesData,
  StorePostData,
} from "@/schemas/create/event/store-post.schema";
import {
  StorePostCategoriesSchema,
  StorePostSchema,
} from "@/schemas/create/event/store-post.schema";
import { postQuery } from "@/utils/post-query";
import type * as ImagePicker from "expo-image-picker";

export const storePost = async (
  postBody: string,
  organizationId: number | null,
  uploadedAt: string | null,
  token: string | null
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/contents`;
  const response = await postQuery<StorePostData>(
    url,
    token,
    {
      create_post: 1,
      body: postBody,
      organization_id: organizationId,
      uploaded_at: uploadedAt,
    },
    StorePostSchema
  );
  return response;
};

export const storePostCategories = async (
  postId: number,
  categories: number[],
  token: string | null,
  eventId?: number
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/categories`;
  const response = await postQuery<StorePostCategoriesData>(
    url,
    token,
    {
      post_id: postId,
      event_id: eventId,
      category_ids: categories,
    },
    StorePostCategoriesSchema
  );
  return response;
};

export const storeMedias = async (
  postId: number,
  files: ImagePicker.ImagePickerAsset[],
  token: string | null
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${postId}/media`;

  const formData = new FormData();
  try {
    files.forEach(async (file, index) => {
      const fileObject = {
        uri: file.uri,
        name: file.fileName || `${file.type}_${index}`,
        type: file.mimeType || "image/jpeg",
      };

      formData.append("medias[]", fileObject, fileObject.name);
    });

    const res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      },
    });
    if (!res?.ok) {
      throw new Error((await res?.json()) || "Unexpected error");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
