import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetPushDetailPath =
  operations['AdminNotificationController_getNotification']['parameters']['path'];
type GetPushDetailHeaders =
  operations['AdminNotificationController_getNotification']['parameters']['header'];

interface GetPushDetailProps {
  path: GetPushDetailPath;
  headers?: OmitGroupIdInHeader<GetPushDetailHeaders>;
}

type GetPushesResponse = components['schemas']['Notification$TJE48aJZdLstGzOQ-ySFdA'];

export async function getPushDetail({
  path,
  headers,
}: GetPushDetailProps): Promise<GetPushesResponse> {
  const response = await authenticateRequest<GetPushesResponse>({
    method: 'get',
    url: `/api/v1/admin/notifications/${path.notificationId}`,
    headers,
  });

  console.log('getPushDetail', { response });
  return response;
}

export type { GetPushDetailPath, GetPushesResponse };
