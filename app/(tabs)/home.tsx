import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { GridCards, useCards } from "@/features/home/grid-cards";
import { Header } from "@/features/layout/header";
import { View } from "react-native";

export default function HomePage() {
  const {
    data: cardsData,
    isLoading: cardsIsLoading,
    error: cardsError,
    handleRefresh,
    isRefreshing,
  } = useCards();

  if (!cardsData || cardsError) {
    // TODO: Implémenter l'erreur
    return;
  }

  return (
    <PageContainer className="bg-background">
      <Header title="InsidePSBS" leftIcon="inside-psbs" rightIcon="settings" />
      <RefreshView handleRefresh={handleRefresh} isRefreshing={isRefreshing}>
        <GridCards
          data={cardsData}
          isLoading={cardsIsLoading}
          error={cardsError}
        />
        <View>
          <Typography size="h1" fontWeight="bold">
            Actualités
          </Typography>
        </View>
      </RefreshView>
    </PageContainer>
  );
}
