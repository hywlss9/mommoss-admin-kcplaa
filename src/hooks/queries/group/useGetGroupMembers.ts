import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getGroupMembers } from '@api/group';
import type { GetGroupMembersQuery } from '@api/group/getGroupMembers';

type QueryGetGroupMembersProps = Partial<Omit<GetGroupMembersQuery, 'type'>> &
  Pick<GetGroupMembersQuery, 'type'>;

function useGetGroupMembers(props: QueryGetGroupMembersProps) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['GROUP_MEMBERS', props.type, props?.page, props?.q],
    async ({ pageParam: page = 1 }) => {
      const query: GetGroupMembersQuery = {
        page,
        limit: 100,
        sort: 'createdAt',
        dir: 'desc',
        ...props,
      };

      const response = await getGroupMembers({ query });

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

export default useGetGroupMembers;
