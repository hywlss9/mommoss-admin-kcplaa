import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdatePushCategoryPath =
  operations['AdminNotificationCategoryController_updateNotificationCategory']['parameters']['path'];
type UpdatePushCategoryData = components['schemas']['UpdateNotificationCategoryDto'];
type UpdatePushCategoryHeaders =
  operations['AdminNotificationCategoryController_updateNotificationCategory']['parameters']['header'];

interface UpdateNoticeProps {
  path: UpdatePushCategoryPath;
  data: UpdatePushCategoryData;
  headers?: OmitGroupIdInHeader<UpdatePushCategoryHeaders>;
}

type UpdatePushCategoryResponse = unknown;

export async function updatePushCategory({
  path,
  data,
  headers,
}: UpdateNoticeProps): Promise<UpdatePushCategoryResponse | false> {
  const response = await authenticateRequest<UpdatePushCategoryResponse>({
    method: 'patch',
    url: `/api/v1/admin/notifications/categories/${path.categoryId}`,
    headers,
    data,
  });

  console.log('updatePushCategory', { response });
  return response;
}
