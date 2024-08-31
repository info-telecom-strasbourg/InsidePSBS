import type { PostBodyData } from "@app/(modals)/create/post/step2/_features/store-post.schema";
import { toDateId } from "@marceloterreiro/flash-calendar";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

type PostInfoType = {
  postBody: PostBodyData | undefined;
  uploadedAt: string;
  organizationId: number | null;
  categories: number[];
};

export type UpdatePostInfoType = <T extends keyof PostInfoType>(
  key: T,
  value: PostInfoType[T]
) => void;

const defaultValues = {
  postBody: undefined,
  uploadedAt: toDateId(new Date()),
  organizationId: null,
  categories: [],
  updatePostInfo: () => {},
};

const CreatePostContext = createContext<
  PostInfoType & {
    updatePostInfo: UpdatePostInfoType;
  }
>(defaultValues);

export const useCreatePost = () => {
  return useContext(CreatePostContext);
};

export const CreatePostProvider = ({ children }: PropsWithChildren) => {
  const [postInfo, setPostInfo] = useState<PostInfoType>(defaultValues);

  const updatePostInfo: UpdatePostInfoType = (key, value) => {
    setPostInfo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CreatePostContext.Provider value={{ ...postInfo, updatePostInfo }}>
      {children}
    </CreatePostContext.Provider>
  );
};
