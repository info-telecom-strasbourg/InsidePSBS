import { useAuth } from "@/auth/useAuth";
import { routes } from "@/constants/routes";
import { useFetch } from "@/hooks/useFetch";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { FouailleData } from "@/schemas/fouaille.schema";
import { FouailleSchema } from "@/schemas/fouaille.schema";
import { colors } from "@/theme/colors";
import { CameraIcon, CreditCard, Users, Utensils } from "lucide-react-native";
import { View } from "react-native";
import Card from "./card";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = FouailleSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data.data;
};

export const useCards = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};

export type GridCardsProps = {
  data: FouailleData["data"];
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
          title={isLoading ? "Loading..." : `${data?.balance}€`}
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
