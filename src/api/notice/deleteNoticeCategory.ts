import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteNoticeCategoryPath =
  operations['AdminNoticeCategoryController_deleteNoticeCategory']['parameters']['path'];
type DeleteNoticeCategoryHeaders =
  operations['AdminNoticeCategoryController_deleteNoticeCategory']['parameters']['header'];

interface DeleteNoticeCategoryProps {
  path: DeleteNoticeCategoryPath;
  headers?: OmitGroupIdInHeader<DeleteNoticeCategoryHeaders>;
}

type DeleteNoticeCategoryResponse = number;

export async function deleteNoticeCategory({
  path,
  headers,
}: DeleteNoticeCategoryProps): Promise<DeleteNoticeCategoryResponse> {
  const response = await authenticateRequest<DeleteNoticeCategoryResponse>({
    method: 'delete',
    url: `/api/v1/admin/notices/categories/${path.noticeCategoryId}`,
    headers,
  });

  console.log('deleteNoticeCategory', { response });
  return response;
}
