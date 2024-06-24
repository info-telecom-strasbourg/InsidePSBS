import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { Identity } from "@/features/organizations/identity";
import { Socials } from "@/features/organizations/socials";
import { useFetch } from "@/hooks/useFetch";
import { AssociationItemSchema } from "@/schemas/assos.schema";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

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

  return !data || isLoading ? (
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
        <View className="gap-5 p-2">
          <Identity data={data} />
          <Typography size="p" fontWeight="medium" className=" text-foreground">
            {data.description}
          </Typography>
          <Socials data={data} className="bg-blue" />
          {/* <Members data={data} /> */}
        </View>
      </RefreshView>
    </PageContainer>
  );
}
