import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function MenuPage() {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsFetching(false);
    };
    if (isFetching) fetchMenu();
  }, [isFetching]);
  return (
    <PageContainer>
      <Header title="Menu" rightIcon="close" />
      <RefreshView
        handleRefresh={async () => setIsFetching(true)}
        isRefreshing={isFetching}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1">
          {isFetching ? (
            <ActivityIndicator />
          ) : (
            <Typography className="text-destructive" size="h4">
              Désolé la page chargée n'est pas disponible suite à un problème de
              l'API du Crous
            </Typography>
          )}
        </View>
      </RefreshView>
    </PageContainer>
  );
}
