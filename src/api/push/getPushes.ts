import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetPushesQuery =
  operations['AdminNotificationController_getNotificationList']['parameters']['query'];
type GetPushesHeaders =
  operations['AdminNotificationController_getNotificationList']['parameters']['header'];

interface GetPushesProps {
  query: GetPushesQuery;
  headers?: OmitGroupIdInHeader<GetPushesHeaders>;
}

type GetPushesResponse = components['schemas']['List$Notification$TJE48aJZdLstGzOQ-ySFdA'];

export async function getPushes({
  query,
  headers,
}: GetPushesProps): Promise<GetPushesResponse | false> {
  const response = await authenticateRequest<GetPushesResponse>({
    method: 'get',
    url: `/api/v1/admin/notifications`,
    headers,
    params: query,
  });

  console.log('getPushes', { response });
  return response;
}

export type { GetPushesQuery, GetPushesResponse };
