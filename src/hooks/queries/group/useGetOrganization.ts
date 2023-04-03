import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getOrganization } from '@api/group';
import type { GetOrganizationQuery } from '@api/group/getOrganization';

function useGetOrganization(props?: Partial<GetOrganizationQuery>) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['ORGANIZATION', props?.page, props?.q],
    async ({ pageParam: page = 1 }) => {
      const query: GetOrganizationQuery = {
        page,
        sort: 'rank',
        limit: 100,
        dir: 'desc',
        ...props,
      };

      const response = await getOrganization({ query });

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

export default useGetOrganization;
