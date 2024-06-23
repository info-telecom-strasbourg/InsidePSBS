import { useAuth } from "@/auth/useAuth";
import { routes } from "@/constants/routes";
import { useFetch } from "@/hooks/useFetch";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { FouailleData } from "@/schemas/fouaille.schema";
import { FouailleSchema } from "@/schemas/fouaille.schema";
import { colors } from "@/theme/colors";
import { CameraIcon, CreditCard, Users, Utensils } from "lucide-react-native";
import { View } from "react-native";
import Card from "../../components/primitives/card";

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
  return data.data;
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

  return (
    <View className="mb-8 flex-col items-center gap-4">
      <View className="flex-1 flex-row gap-4">
        <Card
          subtitle="Fouaille"
          color="purple"
          backgroundColor={colors.lightPurple}
          icon={CreditCard}
          onPress={() => modalRouter.open(routes.fouaille)}
        >
          {isLoading ? "Loading..." : `${data?.balance}€`}
        </Card>
        <Card
          icon={Users}
          color="green"
          backgroundColor={colors.lightGreen}
          onPress={() => modalRouter.open(routes.organizations)}
        >
          Clubs et Assos
        </Card>
      </View>
      <View className="flex-1 flex-row gap-4">
        <Card
          color="orange"
          icon={CameraIcon}
          backgroundColor={colors.lightOrange}
          onPress={() =>
            modalRouter.open("https://nextcloud.its-tps.fr/s/zfFkwR6y5wxt5gW")
          }
        >
          Photo
        </Card>
        <Card
          color="red"
          backgroundColor={colors.lightRed}
          icon={Utensils}
          onPress={() => modalRouter.open(routes.menu)}
        >
          Menu du RU
        </Card>
      </View>
    </View>
  );
};
