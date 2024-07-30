import { postQuery } from "@/utils/post-query";
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
