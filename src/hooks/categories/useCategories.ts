import { z } from 'zod';
import { useFetch } from '../useFetch';

interface CategoryParams {
  is_shown?: boolean;
  search?: string;
}

const CategorySchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      color: z.string(),
      emoji: z.string(),
    })
  ),
});

export const useCategories = (params?: CategoryParams) => {
  const searchParams = new URLSearchParams();
  if (params?.is_shown !== undefined) searchParams.append('is_shown', String(params.is_shown));
  if (params?.search) searchParams.append('search', params.search);

  const queryString = searchParams.toString();
  const apiEndpoint = queryString ? `/api/categories?${queryString}` : '/api/categories';

  return useFetch({
    apiEndpoint,
    schema: CategorySchema,
    queryKey: ['categories', queryString],
  });
};