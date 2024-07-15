import { PageContainer } from "@/components/primitives/container";
import Event from "@/components/primitives/event";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useCalendar } from "@/queries/events/calendar.query";
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
      <Typography size="h3" fontWeight="semibold">
        {day.date}
      </Typography>
      {day.events.map((event, index) => (
        <Event item={event} isLoading={eventsAreLoading} key={index} />
      ))}
    </View>
  );
};

export default function CalendarPage() {
  const { data, setSize, size, isLoading: eventsAreLoading } = useCalendar();

  const items = data ? data.flat() : [];

  const eventList = generateDailyEvents(
    items.filter((item) => item !== undefined)
  );

  const loadMore = () => {
    setSize(size + 1);
  };
  return (
    <PageContainer>
      <Header title="Calendar" rightIcon="settings" leftIcon="inside-psbs" />
      <FlashList<DailyEvents>
        data={eventList}
        renderItem={({ item }) => (
          <RenderEvents day={item} eventsAreLoading={eventsAreLoading} />
        )}
        estimatedItemSize={100}
        onEndReached={loadMore}
        onEndReachedThreshold={5}
        showsVerticalScrollIndicator={false}
      />
    </PageContainer>
  );
}
