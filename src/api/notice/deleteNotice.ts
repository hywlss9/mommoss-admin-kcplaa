import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteNoticePath = operations['AdminNoticeController_deleteNotice']['parameters']['path'];
type DeleteNoticeHeaders = operations['AdminNoticeController_deleteNotice']['parameters']['header'];

interface DeleteNoticeCategoryProps {
  path: DeleteNoticePath;
  headers?: OmitGroupIdInHeader<DeleteNoticeHeaders>;
}

type DeleteNoticeResponse = number;

export async function deleteNotice({
  path,
  headers,
}: DeleteNoticeCategoryProps): Promise<DeleteNoticeResponse | false> {
  const response = await authenticateRequest<DeleteNoticeResponse>({
    method: 'delete',
    url: `/api/v1/admin/notices/${path.noticeId}`,
    headers,
  });

  console.log('deleteNotice', { response });
  return response;
}
