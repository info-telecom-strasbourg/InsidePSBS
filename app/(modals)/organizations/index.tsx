import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useIndexOrganizations } from "@app/(modals)/organizations/_features/fetch/organizations.query";
import { ListItems } from "@app/(modals)/organizations/_features/list-items";
import { Search } from "@app/(tabs)/posts/_features/search";
import { useState } from "react";
import { View } from "react-native";

export default function AssociationsPage() {
  const [searchPhrase, setSearchPhrase] = useState("");

  const { data, isLoading, error, isRefreshing, handleRefresh } =
    useIndexOrganizations(searchPhrase);

  return (
    <PageContainer className="bg-background">
      <Header title="Clubs et Associations" rightIcon="close" />
      <View className="pb-3">
        <Search searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
      </View>
      <RefreshView
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        className="p-2"
      >
        {!data || isLoading ? (
          <PageLoading />
        ) : (
          <>
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
          </>
        )}
      </RefreshView>
    </PageContainer>
  );
}
