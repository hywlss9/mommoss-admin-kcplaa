import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';

type GetGroupInfoPath = operations['GroupController_getGroup']['parameters']['path'];

interface GetGroupInfoProps {
  path: GetGroupInfoPath;
}

type GetGroupInfoResponse = components['schemas']['Group$mZFLkyvTelC5g8XnyQrpOw'];

export async function getGroupInfo({
  path,
}: GetGroupInfoProps): Promise<GetGroupInfoResponse | false> {
  const response = await authenticateRequest<GetGroupInfoResponse>({
    method: 'get',
    url: `/api/v1/groups/${path.groupId}`,
    useGroupId: false,
  });

  console.log('getGroupInfo', { response });
  return response;
}
