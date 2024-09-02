import { cn } from "@/utils/cn";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";
import type { ModalProps } from "react-native";
import { Modal as NativeModal, Pressable, View } from "react-native";

const ModalContext = createContext<
  | {
      openModal: () => void;
      closeModal: () => void;
      isModalVisible: boolean;
    }
  | undefined
>(undefined);

export const useModalRouter = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalRouter must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export const Modal = ({
  popupClassName,
  children,
  ...props
}: ModalProps & { popupClassName?: string }) => {
  const { isModalVisible, closeModal } = useModalRouter();

  return (
    <NativeModal
      visible={isModalVisible}
      transparent
      hardwareAccelerated
      onRequestClose={() => closeModal()}
      {...props}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-[#000000aa]"
        onPress={closeModal}
      >
        <View className={cn("rounded-md bg-white p-2", popupClassName)}></View>
      </Pressable>
    </NativeModal>
  );
};
