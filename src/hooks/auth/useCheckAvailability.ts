import { z } from 'zod';
import { useFetch } from '../useFetch';

interface AvailabilityParams {
  email?: string;
  user_name?: string;
  phone?: string;
}

const AvailabilitySchema = z.object({
  message: z.string().optional(),
});

export const useCheckAvailability = (params?: AvailabilityParams) => {
  
  const searchParams = new URLSearchParams();
  if (params?.email) searchParams.append('email', params.email);
  if (params?.user_name) searchParams.append('user_name', params.user_name);
  if (params?.phone) searchParams.append('phone', params.phone);

  const queryString = searchParams.toString();
  const apiEndpoint = queryString
    ? `/api/register/availability?${queryString}`
    : '/api/register/availability';

  const queryKey = [
    'auth',
    'availability',
    params?.email ?? '',
    params?.user_name ?? '',
    params?.phone ?? '',
  ];

  return useFetch({
    apiEndpoint,
    schema: AvailabilitySchema,
    queryKey,
  });
};