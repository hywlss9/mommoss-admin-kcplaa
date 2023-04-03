import { authenticateRequest } from '@api/authenticateRequest';

import type { components } from '@type/model';

type GetGroupsResponse = components['schemas']['List$Group$mZFLkyvTelC5g8XnyQrpOw'];

export async function getGroups(): Promise<GetGroupsResponse | false> {
  const response = await authenticateRequest<GetGroupsResponse>({
    method: 'get',
    url: '/api/v1/groups',
    useGroupId: false,
  });

  console.log('getGroups', { response });
  return response;
}
