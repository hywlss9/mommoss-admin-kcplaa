import { useQuery } from 'react-query';

import { getPushCategories } from '@api/push';
import type { GetPushCategoriesQuery } from '@api/push/getPushCategories';

function useGetPushCategories(props?: Partial<GetPushCategoriesQuery>) {
  const response = useQuery(
    ['PUSH_CATEGORIES', props?.unused],
    async () => await getPushCategories({ query: props as GetPushCategoriesQuery }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    },
  );

  const data = response.data ?? [];

  return { ...response, data };
}

export default useGetPushCategories;
