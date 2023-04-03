import { useState } from 'react';

import { useInfiniteQuery } from 'react-query';

import { getVideos } from '@api/videos';
import type { GetVideosQuery } from '@api/videos/getVideos';

function useGetVideos(props?: Partial<GetVideosQuery>) {
  const [total, setTotal] = useState<number>(0);

  const response = useInfiniteQuery(
    ['VIDEOS', props?.page, props?.dir],
    async ({ pageParam: page = 1 }) => {
      const query: GetVideosQuery = {
        page,
        limit: 100,
        dir: 'desc',
        ...props,
      };

      const response = await getVideos({ query });

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

export default useGetVideos;
