import { z } from 'zod';
import { useFetch } from '../useFetch';

const EventInfosSchema = z.object({
  data: z.object({
    id: z.number(),
    title: z.string(),
    date_format: z.object({
      start_at_simplified: z.string(),
      end_at_simplified: z.string(),
      date: z.string(),
      days_diff: z.number(),
    }),
    start_at: z.string(),
    end_at: z.string(),
    location: z.string(),
    color: z.string(),
    author: z.object({
      user_is_author: z.boolean(),
      is_organization: z.boolean(),
      id: z.number(),
      name: z.string(),
      short_name: z.string(),
      user_name: z.string(),
      logo_url: z.string().nullable(),
    }),
  }),
});

export const useEventInfos = (eventId: number) => {
  return useFetch({
    apiEndpoint: `/api/event/${eventId}`,
    schema: EventInfosSchema,
    queryKey: ['events', 'detail', String(eventId)],
  });
};  