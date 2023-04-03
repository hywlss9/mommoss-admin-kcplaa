import { authenticateRequest } from '@api/authenticateRequest';

import type { Group } from '@type/group';
import type { operations } from '@type/model';

type GetGroupInfoPath = operations['GroupController_getGroup']['parameters']['path'];

interface GetGroupInfoProps {
  path: GetGroupInfoPath;
}

type GetGroupInfoResponse = Group;

export async function getGroupInfo({ path }: GetGroupInfoProps) {
  const response = await authenticateRequest<GetGroupInfoResponse>({
    method: 'get',
    url: `/api/v1/groups/${path.groupId}`,
    useGroupId: false,
  });

  console.log('getGroupInfo', { response });
  return response;
}
