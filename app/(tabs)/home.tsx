import Card from "@/components/primitives/card";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { FouailleSchema, type FouailleData } from "@/schemas/fouaille.schema";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { CameraIcon, CreditCard, Users, Utensils } from "lucide-react-native";
import { ScrollView, View } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille`;

  const fetcher = async (url: string): Promise<FouailleData> => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 87|m7VZi5MWAmtz3gFkKolgqjAWCeJucV90ZOEdzcCx",
      },
    });
    const data = await res.json();
    const parsedData = FouailleSchema.safeParse(data.data);
    if (!parsedData.success) {
      throw new Error(parsedData.error.message);
    }
    return data.data;
  };

  const { data, isLoading } = useFetch(url, fetcher);

  return (
    <PageContainer className="">
      <ScrollView>
        <Header
          title="InsidePSBS"
          leftIcon="inside-psbs"
          rightIcon="settings"
        />
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
        <View className="">
          <Typography size="h1" fontWeight="bold">
            Actualités
          </Typography>
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default HomeScreen;
