import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getNoticeCategories } from '@api/notice';
import type { GetNoticeCategoriesQuery } from '@api/notice/getNoticeCategories';

function useGetNoticeCategories(props?: Partial<GetNoticeCategoriesQuery>) {
  const [total, setTotal] = useState<number>();

  const response = useInfiniteQuery(
    ['NOTICE_CATEGORIES', props?.page, props?.q],
    async ({ pageParam: page = 1 }) => {
      const query: GetNoticeCategoriesQuery = {
        page,
        limit: 100,
        sort: 'createdAt',
        dir: 'desc',
        ...props,
      };

      const response = await getNoticeCategories({ query });

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

export default useGetNoticeCategories;
