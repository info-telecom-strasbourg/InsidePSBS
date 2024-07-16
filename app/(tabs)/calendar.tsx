import { PageContainer } from "@/components/primitives/container";
import Event, { SkeletonEvent } from "@/components/primitives/event";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useCalendar } from "@/queries/events/calendar.query";
import { capitalize } from "@/utils/capitalize";
import type { DailyEvents } from "@/utils/daily-events";
import { generateDailyEvents } from "@/utils/daily-events";
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
