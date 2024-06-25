import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import ListItems from "@/features/organizations/list-items";
import { Search } from "@/features/posts/search";
import { useFetch } from "@/hooks/useFetch";
import { AssociationSchema } from "@/schemas/assos.schema";
import { View } from "react-native";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const parsedData = AssociationSchema.safeParse(data.data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data;
};

export default function AssociationsPage() {
  const url = "https://fouaille.bde-tps.fr/api/organization";

  const { data, isLoading, error, isRefreshing, handleRefresh } = useFetch(
    url,
    (url: string) => fetcher(url)
  );

  return !data || isLoading ? (
    <PageContainer>
      <Header title="Clubs et Associations" rightIcon="close" />
      <PageLoading />
    </PageContainer>
  ) : (
    <PageContainer className="bg-background">
      <Header title="Clubs et Associations" rightIcon="close" />
      <RefreshView
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        className="p-2"
      >
        <Search />
        <View className="gap-3">
          <Typography
            size="h3"
            className="mt-4 text-foreground"
            fontWeight="semibold"
          >
            Associations
          </Typography>
          {data.associations.map((item) => (
            <ListItems item={item} key={item.id} />
          ))}
        </View>
        <View className="gap-3">
          <Typography
            size="h3"
            className="mt-4 text-foreground"
            fontWeight="semibold"
          >
            Clubs
          </Typography>
          {data.clubs.map((item) => (
            <ListItems item={item} key={item.id} />
          ))}
        </View>
      </RefreshView>
    </PageContainer>
  );
}
