import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreatePushCategoryData = components['schemas']['CreateNotificationCategoryDto'];
type CreatePushCategoryHeaders =
  operations['AdminNotificationCategoryController_createNotificationCategory']['parameters']['header'];

interface CreatePushCategoryProps {
  data: CreatePushCategoryData;
  headers?: OmitGroupIdInHeader<CreatePushCategoryHeaders>;
}

type CreatePushCategoryResponse = unknown;

export async function createPushCategory({
  data,
  headers,
}: CreatePushCategoryProps): Promise<CreatePushCategoryResponse | false> {
  const response = await authenticateRequest<CreatePushCategoryResponse>({
    method: 'post',
    url: `/api/v1/admin/notifications/categories`,
    headers,
    data,
  });

  console.log('createPushCategory', { response });
  return response;
}

export type { CreatePushCategoryData };
