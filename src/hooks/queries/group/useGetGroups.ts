import { useQuery } from 'react-query';

import { getGroups } from '@api/group/getGroups';

export function useGetGroups() {
  return useQuery(['GROUPS'], async () => await getGroups(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
