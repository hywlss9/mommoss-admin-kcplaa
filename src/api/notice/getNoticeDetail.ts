import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { Notice } from '@type/notice';
import type { OmitGroupIdInHeader } from '@type/util';

type GetNoticeDetailPath = operations['AdminNoticeController_getNotice']['parameters']['path'];
type GetNoticeDetailHeaders = operations['AdminNoticeController_getNotice']['parameters']['header'];

interface GetNoticesProps {
  path: GetNoticeDetailPath;
  headers?: OmitGroupIdInHeader<GetNoticeDetailHeaders>;
}

type GetNoticesDetailResponse = Notice;

export async function getNoticeDetail({
  path,
  headers,
}: GetNoticesProps): Promise<GetNoticesDetailResponse> {
  const response = await authenticateRequest<GetNoticesDetailResponse>({
    method: 'get',
    url: `/api/v1/admin/notices/${path.noticeId}`,
    headers,
  });

  console.log('getNoticeDetail', { response });
  return response;
}
