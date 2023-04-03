import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getRoles } from '@api/group';
import type { GetRolesQuery } from '@api/group/getRoles';

//TODO: role 적용해야함
function useGetRoles(props?: Partial<GetRolesQuery>) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['ROLES', props?.page, props?.q],
    async ({ pageParam: page = 1 }) => {
      const query: GetRolesQuery = {
        page,
        limit: 100,
        sort: 'createdAt',
        dir: 'desc',
        ...props,
      };

      const response = await getRoles({ query });

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

export default useGetRoles;
