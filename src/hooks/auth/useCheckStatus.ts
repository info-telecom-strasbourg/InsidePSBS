import { z } from 'zod';
import { useFetch } from '../useFetch';

const CheckStatusSchema = z.object({
  message: z.string(),
});

export const useCheckStatus = () => {
  return useFetch({
    apiEndpoint: '/api/check',
    schema: CheckStatusSchema,
    queryKey: ['auth', 'check'],
  });
};