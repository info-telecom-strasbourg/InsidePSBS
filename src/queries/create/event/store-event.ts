import { StoreEventSchema } from "@/schemas/create/event/store-event.schema";
import { zodFetchWithToken } from "@/utils/fetch";

export const storeEvent = async (
  eventTitle: string,
  eventLocation: string,
  organizationId: number | null,
  startAt: string,
  endAt: string,
  token: string | null
) => {
  const url = "api/contents";
  return await zodFetchWithToken(url, token, {
    data: {
      create_event: 1,
      title: eventTitle,
      location: eventLocation,
      organization_id: organizationId,
      start_at: startAt,
      end_at: endAt,
    },
    method: "POST",
    schema: StoreEventSchema,
  });
};
