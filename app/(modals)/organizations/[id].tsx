import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { AssociationItemSchema } from "@/schemas/assos.schema";
import { useLocalSearchParams } from "expo-router";
import { Image, View } from "react-native";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const parsedData = AssociationItemSchema.safeParse(data.data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data;
};

export default function AssoIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const url = `https://fouaille.bde-tps.fr/api/organization/${id}`;

  const { data, isLoading, isRefreshing, handleRefresh } = useFetch(
    url,
    fetcher
  );

  return isLoading ? (
    <>
      <Header title="Profil" rightIcon="close" />
      <PageLoading />
    </>
  ) : (
    <PageContainer>
      <Header title="Profil" leftIcon="back" rightIcon="close" />
      <RefreshView
        scrollEnabled={false}
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
      >
        <View className="">
          <View className="flex-row items-center justify-start gap-4">
            <Image
              source={{ uri: `${data?.logo_url}` }}
              className="size-24 rounded-full"
              style={{ resizeMode: "cover" }}
            />
            <View>
              <Typography
                size="h1"
                className="text-foreground"
                fontWeight="semibold"
              >
                {data?.short_name}
              </Typography>
              <Typography size="h3" className="text-muted-foreground">
                {data?.name}
              </Typography>
            </View>
          </View>
          <View className="">
            <Typography
              size="p"
              fontWeight="medium"
              className="text-foreground"
            >
              {data?.description}
            </Typography>
          </View>
        </View>
      </RefreshView>
    </PageContainer>
  );
}
