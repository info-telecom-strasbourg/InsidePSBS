import { CustomModal } from "@/components/primitives/custom-modal";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { ArrowRight, TriangleAlert } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export const EmptyEditor = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme } = useTheme();
  return (
    <CustomModal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      setIsOpen={setModalOpen}
    >
      <View className="w-full justify-center rounded-2xl bg-popover p-6">
        <View className="mb-4 flex-row items-center gap-4">
          <TriangleAlert size={24} color={colors[theme].destructive} />
          <Typography size="h4" className="text-foreground" fontWeight="bold">
            Erreur !
          </Typography>
        </View>
        <Typography size="h5">
          Vous ne pouvez pas publier un message vide !
        </Typography>
        <View className="flex-row items-center justify-end gap-8">
          <TouchableOpacity
            onPress={() => setModalOpen(false)}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalOpen(false)}
            className="flex-row items-center gap-4"
          >
            <Typography fontWeight="medium" size="h3">
              Continuer
            </Typography>
            <ArrowRight size={24} color={colors[theme].foreground} />
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};
