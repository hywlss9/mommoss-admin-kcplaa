import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdateNoticePath = operations['AdminNoticeController_updateNotice']['parameters']['path'];
type UpdateNoticeData = components['schemas']['UpdateNoticeDto'];
type UpdateNoticeHeaders = operations['AdminNoticeController_updateNotice']['parameters']['header'];

interface UpdateNoticeProps {
  path: UpdateNoticePath;
  data: UpdateNoticeData;
  headers?: OmitGroupIdInHeader<UpdateNoticeHeaders>;
}

type UpdateNoticeResponse = number;

export async function updateNotice({
  path,
  data,
  headers,
}: UpdateNoticeProps): Promise<UpdateNoticeResponse | false> {
  const response = await authenticateRequest<UpdateNoticeResponse>({
    method: 'patch',
    url: `/api/v1/admin/notices/${path.noticeId}`,
    headers,
    data,
  });

  console.log('updateNotice', { response });
  return response;
}
