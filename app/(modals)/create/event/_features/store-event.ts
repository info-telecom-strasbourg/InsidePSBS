import { postQuery } from "@/utils/post-query";
import type { StoreEventData } from "./store-event.schema";
import { StoreEventSchema } from "./store-event.schema";

export const storeEvent = async (
  eventTitle: string,
  eventLocation: string,
  organizationId: number | null,
  startAt: string,
  endAt: string,
  token: string | null
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/contents`;
  const response = await postQuery<StoreEventData>(
    url,
    token,
    {
      create_event: 1,
      title: eventTitle,
      location: eventLocation,
      organization_id: organizationId,
      start_at: startAt,
      end_at: endAt,
    },
    StoreEventSchema
  );
  return response;
};
