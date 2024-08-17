import { postQuery } from "@/utils/post-query";
import * as FileSystem from "expo-file-system";
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
  file: ImagePicker.ImagePickerSuccessResult["assets"][0],
  token: string | null
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/${postId}/media`;
  try {
    const response = await FileSystem.uploadAsync(url, file.uri, {
      fieldName: "media",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      mimeType: file.mimeType,
      httpMethod: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(JSON.stringify(response, null, 4));
  } catch (error) {
    throw error;
  }
};
