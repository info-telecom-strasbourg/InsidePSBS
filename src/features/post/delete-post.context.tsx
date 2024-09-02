import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

type DeletePostType = {
  isDeletePostModalOpen: boolean;
  confirmDelete: boolean;
};

export type UpdateDeletePostType = <T extends keyof DeletePostType>(
  key: T,
  value: DeletePostType[T]
) => void;

const defaultValues = {
  isDeletePostModalOpen: false,
  confirmDelete: false,
  updateDeletePost: () => {},
};

const DeletePostContext = createContext<
  DeletePostType & {
    updateDeletePost: UpdateDeletePostType;
  }
>(defaultValues);

export const useDeletePost = () => {
  return useContext(DeletePostContext);
};

export const DeletePostProvider = ({ children }: PropsWithChildren) => {
  const [deletePost, setDeletePost] = useState<DeletePostType>(defaultValues);

  const updateDeletePost: UpdateDeletePostType = (key, value) => {
    setDeletePost((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <DeletePostContext.Provider value={{ ...deletePost, updateDeletePost }}>
      {children}
    </DeletePostContext.Provider>
  );
};
