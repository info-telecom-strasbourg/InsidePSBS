import { routes } from "@/constants/routes";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { FouailleBalanceData } from "@/schemas/fouaille/balance.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type BottomSheet from "@gorhom/bottom-sheet";
import { CameraIcon, CreditCard, Users, Utensils } from "lucide-react-native";
import { useRef } from "react";
import { Alert, View } from "react-native";
import Card from "./card";

export type GridCardsProps = {
  data: FouailleBalanceData["data"];
  isLoading: boolean;
};

export const GridCards = ({ data, isLoading }: GridCardsProps) => {
  const modalRouter = useModalRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const { theme } = useTheme();

  const alertMPS = () => {
    Alert.alert(
      "Vous allez quitter l'application InsidePSBS.",
      "Voulez-vous continuer ?",

      [
        {
          text: "Non",
          style: "destructive",
        },
        {
          text: "Oui",
          onPress: () =>
            modalRouter.open("https://nextcloud.its-tps.fr/s/zfFkwR6y5wxt5gW"),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="mb-8 flex-col items-center gap-4">
      <View className="flex-1 flex-row gap-4">
        <Card
          title={isLoading ? "Loading..." : `${data.balance}€`}
          subtitle="Fouaille"
          backgroundColor={colors.lightPurple}
          color={colors.purple}
          icon={CreditCard}
          onPress={() => modalRouter.open(routes.fouaille)}
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
          onPress={alertMPS}
        />
        <Card
          title="Menu du RU"
          backgroundColor={colors.lightRed}
          color={colors.red}
          icon={Utensils}
          onPress={() => modalRouter.open(routes.menu)}
        />
      </View>
    </View>
  );
};
