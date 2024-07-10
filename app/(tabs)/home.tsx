import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { GridCards } from "@/features/home/grid-cards";
import { Header } from "@/features/layout/header";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useEvents } from "@/queries/events/event.query";
import { useCards } from "@/queries/home/cards.query";
import type { EventsData } from "@/schemas/events/event.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { capitalize } from "@/utils/capitalize";

import { Clock, Forward, MapPin } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

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

  const modalRouter = useModalRouter();
  const { theme } = useTheme();

  const renderEvents = (item: EventItem) => {
    return (
      <View key={item.id} className="flex-row gap-3 rounded-2xl bg-popover p-4">
        <View
          className="w-1 rounded-full"
          style={{ backgroundColor: item.color }}
        ></View>
        <View>
          <View className="w-full flex-row items-center justify-between pr-6">
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() =>
                  modalRouter.open(`/organizations/${item.author.id}`)
                }
              >
                <Image
                  source={{ uri: item.author.logo_url || undefined }}
                  className="size-12"
                />
              </TouchableOpacity>
              <Typography size="h5" fontWeight="semibold">
                {item.author.short_name}
              </Typography>
            </View>
            <Typography
              size="p"
              className="rounded-full px-3 py-1 text-white"
              style={{
                backgroundColor: item.color,
                fontFamily: "SpaceGrotesk-semibold",
              }}
            >
              {capitalize(item.date_format.date)}
            </Typography>
          </View>
          <View className="gap-3">
            <Text
              style={{
                color: item.color,
                fontFamily: "SpaceGrotesk-semibold",
                fontSize: 22,
              }}
            >
              {item.title}
            </Text>
            <View className="flex-row items-center gap-2">
              <Clock color={colors[theme].foreground} size={24} />
              <Typography>
                {item.date_format.start_at_simplified} -{" "}
                {item.date_format.end_at_simplified}
              </Typography>
            </View>
            <View className="w-full flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MapPin color={colors[theme].foreground} size={24} />
                <Typography>{item.location}</Typography>
              </View>
              {item.post_id ? (
                <TouchableOpacity
                  className="mr-6"
                  onPress={() => modalRouter.open(`/post/${item.post_id}`)}
                >
                  <Forward color={colors[theme].foreground} size={24} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <PageContainer className="bg-background">
      <Header title="InsidePSBS" leftIcon="inside-psbs" rightIcon="settings" />
      <RefreshView
        className="flex-1"
        handleRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        showsVerticalScrollIndicator={false}
      >
        {!cardsData || cardsIsLoading ? (
          <PageLoading />
        ) : (
          <GridCards data={cardsData} isLoading={cardsIsLoading} />
        )}
        <Typography size="h1" fontWeight="bold" className="mb-3">
          Evènements à venir
        </Typography>
        <View className="mb-4 gap-4">
          {eventsData?.map((item) => renderEvents(item))}
        </View>
      </RefreshView>
    </PageContainer>
  );
}
