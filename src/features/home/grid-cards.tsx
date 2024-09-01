import { CustomModal } from "@/components/primitives/custom-modal";
import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { FouailleBalanceData } from "@/schemas/fouaille/balance.schema";
import { colors } from "@/theme/colors";
import { useRouter, type Href } from "expo-router";
import { CameraIcon, CreditCard, Users, Utensils } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Card } from "./card";

export type GridCardsProps = {
  data: FouailleBalanceData["data"];
  isLoading: boolean;
};

export const GridCards = ({ data, isLoading }: GridCardsProps) => {
  const modalRouter = useModalRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <CustomModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        setIsOpen={setModalOpen}
      >
        <View className="w-full justify-center rounded-2xl bg-popover p-6">
          <View className="mb-4">
            <Typography size="h4" className="text-foreground" fontWeight="bold">
              Vous allez quitter l'application InsidePSBS.
            </Typography>
            <Typography size="h5">Voulez-vous continuer ?</Typography>
          </View>
          <View className="flex-row items-center justify-end gap-8">
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Typography fontWeight="medium" size="h3">
                Non
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push(routes.mps as Href)}>
              <Typography fontWeight="medium" size="h3">
                Oui
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <View className="mb-8 flex-col items-center gap-4">
        <View className="flex-1 flex-row gap-4">
          <Card
            title={isLoading ? "Loading..." : `${data.balance}€`}
            subtitle="Fouaille"
            backgroundColor={colors.lightPurple}
            color={colors.purple}
            icon={CreditCard}
            onPress={() => router.push(routes.fouaille as Href)}
          />
          <Card
            title="Clubs et Assos"
            backgroundColor={colors.lightGreen}
            color={colors.green}
            icon={Users}
            onPress={() => modalRouter.open(routes.organizations)}
          />
        </View>
        <View className="flex-1 flex-row gap-4">
          <Card
            title="Photo"
            backgroundColor={colors.lightOrange}
            color={colors.orange}
            icon={CameraIcon}
            onPress={() => setModalOpen(true)}
          />
          <Card
            title="Menu du RU"
            backgroundColor={colors.lightRed}
            color={colors.red}
            icon={Utensils}
            onPress={() => router.push(routes.menu as Href)}
          />
        </View>
      </View>
    </>
  );
};
