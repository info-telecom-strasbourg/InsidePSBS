import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { FouailleSchema } from "@/schemas/fouaille.schema";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { CameraIcon, CreditCard, Users, Utensils } from "lucide-react-native";
import { View } from "react-native";
import Card from "../primitives/card";

const GridCards = () => {
  const router = useRouter();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille`;

  const { token } = useAuth();

  const fetcher = async (url: string) => {
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
  const { data, isLoading } = useFetch(url, fetcher);

  return (
    <View className="mb-8 flex-col items-center gap-4">
      <View className="flex-1 flex-row gap-4">
        <Card
          subtitle="Fouaille"
          color="purple"
          backgroundColor={colors.lightPurple}
          icon={CreditCard}
          onPress={() => router.push("/fouaille")}
        >
          {isLoading ? "Loading..." : `${data?.balance}€`}
        </Card>
        <Card
          icon={Users}
          color="green"
          backgroundColor={colors.lightGreen}
          onPress={() => router.push("/assos")}
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
            router.replace("https://nextcloud.its-tps.fr/s/zfFkwR6y5wxt5gW")
          }
        >
          Photo
        </Card>
        <Card
          color="red"
          backgroundColor={colors.lightRed}
          icon={Utensils}
          onPress={() => router.push("/menu")}
        >
          Menu du RU
        </Card>
      </View>
    </View>
  );
};

export default GridCards;
