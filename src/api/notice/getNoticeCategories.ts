import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetNoticeCategoriesQuery =
  operations['AdminNoticeCategoryController_getNoticeCategoryList']['parameters']['query'];
type GetNoticeCategoriesHeaders =
  operations['AdminNoticeCategoryController_getNoticeCategoryList']['parameters']['header'];

interface GetNoticeCategoriesProps {
  query: GetNoticeCategoriesQuery;
  headers?: OmitGroupIdInHeader<GetNoticeCategoriesHeaders>;
}

type GetNoticeCategoriesResponse =
  components['schemas']['List$NoticeCategory$mZFLkyvTelC5g8XnyQrpOw'];

export async function getNoticeCategories({
  query,
  headers,
}: GetNoticeCategoriesProps): Promise<GetNoticeCategoriesResponse> {
  const response = await authenticateRequest<GetNoticeCategoriesResponse>({
    method: 'get',
    url: `/api/v1/admin/notices/categories`,
    headers,
    params: query,
  });

  console.log('getNoticeCategories', { response });
  return response;
}

export type { GetNoticeCategoriesQuery };
