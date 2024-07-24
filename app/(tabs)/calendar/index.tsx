import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { capitalize } from "@/utils/capitalize";
import type { DailyEvents } from "@/utils/daily-events";
import { generateDailyEvents } from "@/utils/daily-events";
import { Event, SkeletonEvent } from "@app/(tabs)/calendar/_features/event";
import { useCalendar } from "@app/(tabs)/calendar/_features/fetch/calendar.query";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";

const RenderEvents = ({
  day,
  eventsAreLoading,
}: {
  day: DailyEvents;
  eventsAreLoading: boolean;
}) => {
  return (
    <View>
      <Typography size="h3" fontWeight="semibold" className="mb-4">
        {capitalize(day.date)}
      </Typography>
      {day.events.length === 0 ? (
        <Typography size="h4" className="mb-4 text-center">
          Il n'y a pas d'évènements en ce jour !
        </Typography>
      ) : (
        day.events.map((event, index) => (
          <Event item={event} isLoading={eventsAreLoading} key={index} />
        ))
      )}
    </View>
  );
};

export default function CalendarPage() {
  const { data, setSize, size, isLoading: eventsAreLoading } = useCalendar();

  const items = data ? data.flat() : [];

  const eventList = generateDailyEvents(items);

  const loadMore = () => {
    setSize(size + 1);
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
          <RenderEvents day={item} eventsAreLoading={eventsAreLoading} />
        )}
        estimatedItemSize={100}
        onEndReached={loadMore}
        onEndReachedThreshold={5}
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
