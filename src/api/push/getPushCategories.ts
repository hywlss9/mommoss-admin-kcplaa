import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { PushCategory } from '@type/push';
import type { OmitGroupIdInHeader } from '@type/util';

type GetPushCategoriesQuery =
  operations['AdminNotificationCategoryController_getNotificationCategoryList']['parameters']['query'];
type GetPushCategoriesHeaders =
  operations['AdminNotificationCategoryController_getNotificationCategoryList']['parameters']['header'];

interface GetPushCategoriesProps {
  query: GetPushCategoriesQuery;
  headers?: OmitGroupIdInHeader<GetPushCategoriesHeaders>;
}

type GetPushCategoriesResponse = PushCategory[];

export async function getPushCategories({
  query,
  headers,
}: GetPushCategoriesProps): Promise<GetPushCategoriesResponse> {
  const response = await authenticateRequest<GetPushCategoriesResponse>({
    method: 'get',
    url: `/api/v1/admin/notifications/categories`,
    headers,
    params: query,
  });

  console.log('getPushCategories', { response });
  return response;
}

export type { GetPushCategoriesQuery, GetPushCategoriesResponse };
