import { z } from 'zod';
import { useFetch } from '../useFetch';

interface EventIndexParams {
  per_page?: number;
  page?: number;
  start_at?: string;
  organization_id?: number;
  previous_date?: string;
}

const EventIndexSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      start_at: z.string(),
      end_at: z.string(),
      location: z.string().nullable().optional(),
      color: z.string().nullable().optional(),
    })
  ).optional(),
  message: z.string().optional(),
});

export const useEvents = (params?: EventIndexParams) => {
  const searchParams = new URLSearchParams();
  if (params?.per_page) searchParams.append('per_page', String(params.per_page));
  if (params?.page) searchParams.append('page', String(params.page));
  if (params?.start_at) searchParams.append('start_at', params.start_at);
  if (params?.organization_id) searchParams.append('organization_id', String(params.organization_id));
  if (params?.previous_date) searchParams.append('previous_date', params.previous_date);

  const queryString = searchParams.toString();
  const apiEndpoint = queryString ? `/api/event?${queryString}` : '/api/event';

  return useFetch({
    apiEndpoint,
    schema: EventIndexSchema,
    queryKey: ['events', 'list', queryString],
  });
};