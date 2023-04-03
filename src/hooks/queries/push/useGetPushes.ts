import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getPushes } from '@api/push';
import type { GetPushesQuery } from '@api/push/getPushes';

function useGetPushes(props?: Partial<GetPushesQuery>) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['PUSHES', props?.page, props?.q, props?.dir],
    async ({ pageParam: page = 1 }) => {
      const query: GetPushesQuery = {
        page,
        limit: 100,
        sort: 'createdAt',
        dir: 'desc',
        ...props,
      };

      const response = await getPushes({ query });

      if (response) setTotal(response.count);

      return response;
    },
    {
      getNextPageParam: (_, pageParam) => {
        const result = pageParam.length + 1;
        return result;
      },
      getPreviousPageParam: (_, pageParam) => {
        const result = pageParam.length - 1;
        return result || 1;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    },
  );

  const data =
    response.data?.pages?.filter(v => v)?.flatMap(data => (data ? data?.rows?.map(v => v) : [])) ||
    [];

  return { ...response, data, total };
}

export default useGetPushes;
