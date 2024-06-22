import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { OneAssoSchema } from "@/schemas/assos.schema";
import { useLocalSearchParams } from "expo-router";
import { Image, View } from "react-native";

const Query = () => {
  const local = useLocalSearchParams();

  const url = `https://fouaille.bde-tps.fr/api/organization/${local?.query}`;

  const fetcher = async () => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const parsedData = OneAssoSchema.safeParse(data.data);
    if (!parsedData.success) {
      throw new Error(parsedData.error.message);
    }
    return data.data;
  };
  const { data } = useFetch(url, fetcher);

  return (
    <PageContainer className="bg-background">
      <Header title={`${data?.short_name}`} leftIcon="back" rightIcon="close" />
      <View className="flex-1 items-center justify-center">
        <View className="items-center justify-between">
          <Image
            source={{ uri: `${data?.logo_url}` }}
            className="size-52 rounded-full"
            style={{ resizeMode: "cover" }}
          />
          <Typography size="h1" className="text-foreground">
            {data?.name}
          </Typography>
        </View>
        <View className="items-center justify-center rounded-2xl bg-popover p-5">
          <Typography size="h4" fontWeight="medium" className="text-foreground">
            {data?.description}
          </Typography>
        </View>
      </View>
    </PageContainer>
  );
};

export default Query;
