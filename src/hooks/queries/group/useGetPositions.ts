import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getPositions } from '@api/group';
import type { GetPositionsQuery } from '@api/group/getPositions';

function useGetPositions(props?: Partial<GetPositionsQuery>) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['POSITIONS', props?.page, props?.q],
    async ({ pageParam: page = 1 }) => {
      const query: GetPositionsQuery = {
        page,
        limit: 10,
        sort: 'createdAt',
        dir: 'asc',
        ...props,
      };

      const response = await getPositions({ query });

      if (response) setTotal(response.count);

      return response;
    },
    //TODO: 같은 코드 많은데 나중에 합치기
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

  const data = response.data?.pages?.filter(v => v)?.flatMap(data => data?.rows?.map(v => v)) || [];

  return { ...response, data, total };
}

export default useGetPositions;
