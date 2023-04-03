import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getAssociationMembers } from '@api/group';
import type { GetAssociationMembersQuery } from '@api/group/getAssociationMembers';

function useGetAssociationMembers(props?: Partial<GetAssociationMembersQuery>) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['ASSOCIATION_MEMBERS', props?.page, props?.q],
    async ({ pageParam: page = 1 }) => {
      const query: GetAssociationMembersQuery = {
        page,
        limit: 10,
        dir: 'desc',
        ...props,
      };

      const response = await getAssociationMembers({ query });

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

export default useGetAssociationMembers;
