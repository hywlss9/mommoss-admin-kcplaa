import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UploadGroupFileData = FormData;
type UploadGroupFileHeaders = operations['FileController_uploadGroupFile']['parameters']['header'];

interface UploadGroupFileProps {
  data: UploadGroupFileData;
  headers?: OmitGroupIdInHeader<UploadGroupFileHeaders>;
}

type CreateNoticeResponse = string;

export async function uploadGroupFile({
  data,
  headers,
}: UploadGroupFileProps): Promise<CreateNoticeResponse | false> {
  const response = await authenticateRequest<CreateNoticeResponse>({
    method: 'post',
    url: `/api/v1/files/group`,
    headers,
    data,
    isFile: true,
  });

  console.log('uploadGroupFile', { response });
  return response;
}

export type { UploadGroupFileData };
