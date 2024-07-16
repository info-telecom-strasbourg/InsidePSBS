import type { EventsData } from "@/schemas/GET/events/event.schema";
import { addDays, format, isSameDay, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export type DailyEvents = {
  date: string;
  events: (EventsData["data"][0] | undefined)[];
};

export const generateDailyEvents = (
  events: (EventsData["data"][0] | undefined)[]
) => {
  const dailyEvents = [];
  let currentDate = parseISO(events[0]?.start_at || "");
  const endDate = parseISO(events[events.length - 1]?.start_at || "");

  while (currentDate <= endDate) {
    const formattedDate = format(currentDate, "EEEE d MMMM", { locale: fr });
    const eventsForDay = events.filter((event) =>
      isSameDay(currentDate, parseISO(event?.start_at || ""))
    );

    dailyEvents.push({
      date: formattedDate,
      events: eventsForDay,
    });

    currentDate = addDays(currentDate, 1);
  }

  return dailyEvents;
};
