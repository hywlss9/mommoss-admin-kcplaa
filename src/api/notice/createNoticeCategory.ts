import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateNoticeCategoryData = components['schemas']['CreateNoticeCategoryDto'];
type CreateNoticeCategoryHeaders =
  operations['AdminNoticeCategoryController_createNoticeCategory']['parameters']['header'];

interface CreateNoticeCategoryProps {
  data: CreateNoticeCategoryData;
  headers?: OmitGroupIdInHeader<CreateNoticeCategoryHeaders>;
}

interface CreateNoticeCategoryResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  name: string;
}

export async function createNoticeCategory({
  data,
  headers,
}: CreateNoticeCategoryProps): Promise<CreateNoticeCategoryResponse> {
  const response = await authenticateRequest<CreateNoticeCategoryResponse>({
    method: 'post',
    url: `/api/v1/admin/notices/categories`,
    headers,
    data,
  });

  console.log('createNoticeCategory', { response });
  return response;
}

export type { CreateNoticeCategoryData };
