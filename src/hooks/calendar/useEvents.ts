import { useFetch } from "@/hooks/useFetch";
import { EventSchema, type EventsData } from "@/schemas/calendar/event.schema";

export const useEvents = () => {
  return useFetch<EventsData>({
    apiEndpoint: "event", 
    schema: EventSchema,
    queryKey: ["events"],
  });
};