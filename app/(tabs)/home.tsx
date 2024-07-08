import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { GridCards } from "@/features/home/grid-cards";
import { Header } from "@/features/layout/header";
import { useEvents } from "@/queries/events/event.query";
import { useCards } from "@/queries/home/cards.query";
import type { EventsData } from "@/schemas/events/event.schema";
import type { ListRenderItem } from "@shopify/flash-list";
import { FlashList } from "@shopify/flash-list";
import { Image, View } from "react-native";

type EventItem = EventsData["data"][0];

export default function HomePage() {
  const {
    data: cardsData,
    isLoading: cardsIsLoading,
    error: cardsError,
    handleRefresh,
    isRefreshing,
  } = useCards();

  const { data: eventsData } = useEvents();

  const renderEvents: ListRenderItem<EventItem> = ({ item }) => {
    return (
      <View className="rounded-2xl bg-popover p-4">
        <View className="flex-row justify-between">
          <View className="gap-4">
            <Image
              source={{ uri: item.author.logo_url || undefined }}
              className="size-16"
            />
            <Typography size="h3">{item.author.name}</Typography>
          </View>
          <Typography size="h4" className="rounded-full bg-blue p-4">
            Samedi
          </Typography>
        </View>
        <View className="gap-3">
          <Typography size="h2" fontWeight="bold" className="text-blue">
            {item.title}
          </Typography>
        </View>

        <Typography>{item.title}</Typography>
        <Typography>{item.description}</Typography>
      </View>
    );
  };

  return (
    <PageContainer className="bg-background">
      <Header title="InsidePSBS" leftIcon="inside-psbs" rightIcon="settings" />
      <RefreshView handleRefresh={handleRefresh} isRefreshing={isRefreshing}>
        {!cardsData || cardsIsLoading ? (
          <PageLoading />
        ) : (
          <GridCards
            data={cardsData}
            isLoading={cardsIsLoading}
            error={cardsError}
          />
        )}
        <Typography size="h1" fontWeight="bold">
          Evènements à venir
        </Typography>
      </RefreshView>
      <FlashList
        data={eventsData}
        renderItem={renderEvents}
        estimatedItemSize={100}
      />
    </PageContainer>
  );
}
