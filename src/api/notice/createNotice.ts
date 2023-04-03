import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { WriteNoticeData } from '@type/notice';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateNoticeData = Omit<WriteNoticeData, 'files'>;
type CreateNoticeHeaders = operations['AdminNoticeController_createNotice']['parameters']['header'];

interface CreateNoticeProps {
  data: CreateNoticeData;
  headers?: OmitGroupIdInHeader<CreateNoticeHeaders>;
}

type CreateNoticeResponse = unknown;

export async function createNotice({
  data,
  headers,
}: CreateNoticeProps): Promise<CreateNoticeResponse | false> {
  const response = await authenticateRequest<CreateNoticeResponse>({
    method: 'post',
    url: `/api/v1/admin/notices`,
    headers,
    data,
  });

  console.log('createNotice', { response });
  return response;
}

export type { CreateNoticeData };
