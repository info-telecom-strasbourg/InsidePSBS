import type { ModalProps } from "react-native";
import { Modal, Pressable } from "react-native";

type Props = ModalProps & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const CustomModal = ({ isOpen, setIsOpen, children, ...props }: Props) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      statusBarTranslucent
      hardwareAccelerated
      onRequestClose={() => setIsOpen(false)}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-gray-800/40 px-6"
        onPress={() => setIsOpen(false)}
      >
        {children}
      </Pressable>
    </Modal>
  );
};

export default CustomModal;
