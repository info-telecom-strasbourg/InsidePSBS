import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { Event, SkeletonEvent } from "@/features/calendar/event";
import { useCalendar } from "@/queries/calendar/calendar.query";
import { capitalize } from "@/utils/capitalize";
import type { DailyEvents } from "@/utils/daily-events";
import { generateDailyEvents } from "@/utils/daily-events";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function CalendarPage() {
  const {
    data,
    setSize,
    size,
    hasMore,
    isRefreshing: isCalendarRefreshing,
    handleRefresh,
  } = useCalendar();

  const items = data ? data.flat() : [];

  const eventList = generateDailyEvents(items);

  const loadMore = () => {
    if (hasMore) {
      setSize(size + 1);
    }
  };
  return (
    <PageContainer>
      <Header title="Calendrier" rightIcon="settings" leftIcon="inside-psbs" />
      <FlashList<DailyEvents>
        data={eventList}
        renderItem={({ item }) => (
          <View>
            <Typography size="h3" fontWeight="semibold" className="mb-4">
              {capitalize(item.date)}
            </Typography>
            {item.events.length === 0 ? (
              <Typography size="h4" className="mb-4 text-center">
                Il n'y a pas d'évènements en ce jour !
              </Typography>
            ) : (
              item.events.map((event, index) => (
                <Event item={event} key={index} />
              ))
            )}
          </View>
        )}
        estimatedItemSize={100}
        onEndReached={loadMore}
        onEndReachedThreshold={3}
        refreshControl={
          <RefreshControl
            refreshing={isCalendarRefreshing}
            onRefresh={handleRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="mb-4">
            <SkeletonEvent />
            <SkeletonEvent />
            <SkeletonEvent />
            <SkeletonEvent />
          </View>
        }
      />
    </PageContainer>
  );
}
