import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getFamilyEvents } from '@api/event';
import type { GetFamilyEventsQuery } from '@api/event/getFamilyEvents';

function useGetFamilyEvents(props?: Partial<GetFamilyEventsQuery>) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['FAMILY_EVENTS', props?.page, props?.dir, props?.q],
    async ({ pageParam: page = 1 }) => {
      const query: GetFamilyEventsQuery = {
        page,
        limit: 100,
        dir: 'desc',
        ...props,
      };

      const response = await getFamilyEvents({ query });

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

  const data = response.data?.pages?.filter(v => v)?.flatMap(data => data?.rows?.map(v => v)) || [];

  return { ...response, data, total };
}

export default useGetFamilyEvents;
