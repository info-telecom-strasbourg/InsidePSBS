import { postQuery } from "@/utils/post-query";
import type * as ImagePicker from "expo-image-picker";
import type {
  StorePostCategoriesData,
  StorePostData,
} from "./store-post.schema";
import {
  StorePostCategoriesSchema,
  StorePostSchema,
} from "./store-post.schema";

export const storePost = async (
  postBody: string,
  organizationId: number | null,
  uploadedAt: string | null,
  token: string | null
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/contents`;
  try {
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
  } catch (error) {
    throw error;
  }
};

export const storePostCategories = async (
  postId: number,
  categories: number[],
  token: string | null,
  eventId?: number
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/categories`;
  try {
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
  } catch (error) {
    throw error;
  }
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
    if (!res.ok) {
      const error = await res.json();
      throw new Error(`HTTP error! status: ${res.status}, message: ${error}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
