import { postQuery } from "@/utils/post-query";
import type { StoreCommentData } from "./store-comment.schema";
import { StoreCommentSchema } from "./store-comment.schema";

export const storeComment = async (
  commentInput: string,
  postId: string,
  token: string | null,
  parentCommentId?: number
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${postId}/comment`;
  try {
    const response = await postQuery<StoreCommentData>(
      url,
      token,
      parentCommentId
        ? {
            body: commentInput,
            post_id: postId,
            parent_comment_id: parentCommentId,
          }
        : {
            body: commentInput,
            post_id: postId,
          },
      StoreCommentSchema
    );
    return response;
  } catch (error) {
    throw error;
  }
};