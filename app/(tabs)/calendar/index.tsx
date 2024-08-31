import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { capitalize } from "@/utils/capitalize";
import type { DailyEvents } from "@/utils/daily-events";
import { generateDailyEvents } from "@/utils/daily-events";
import { useCalendar } from "@app/(tabs)/calendar/_features/calendar.query";
import { Event, SkeletonEvent } from "@app/(tabs)/calendar/_features/event";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";

export default function CalendarPage() {
  const { data, setSize, size, hasMore } = useCalendar();

  const items = data ? data.flat() : [];

  const eventList = generateDailyEvents(items);

  const loadMore = () => {
    if (hasMore) {
      setSize(size + 1);
    }
  };
  return (
    <PageContainer>
      <Header
        title="Calendar"
        rightIcon="notifications"
        leftIcon="inside-psbs"
      />
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
