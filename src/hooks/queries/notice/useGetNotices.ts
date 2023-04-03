import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getNotices } from '@api/notice';
import type { GetNoticesQuery } from '@api/notice/getNotices';

function useGetNotices(props?: Partial<GetNoticesQuery>) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['NOTICES', props?.page, props?.q, props?.dir],
    async ({ pageParam: page = 1 }) => {
      const query: GetNoticesQuery = {
        page,
        limit: 100,
        sort: 'createdAt',
        dir: 'desc',
        ...props,
      };

      const response = await getNotices({ query });

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

export default useGetNotices;
