import { routes } from "@/constants/routes";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { FouailleBalanceData } from "@/schemas/fouaille/balance.schema";
import { colors } from "@/theme/colors";
import { CameraIcon, CreditCard, Users, Utensils } from "lucide-react-native";
import { View } from "react-native";
import Card from "./card";

export type GridCardsProps = {
  data: FouailleBalanceData["data"];
  isLoading: boolean;
  error: string | null;
};

export const GridCards = ({ data, isLoading, error }: GridCardsProps) => {
  const modalRouter = useModalRouter();

  // TODO: Implémenter error

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
          onPress={() =>
            modalRouter.open("https://nextcloud.its-tps.fr/s/zfFkwR6y5wxt5gW")
          }
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
