import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetGroupFilePath = operations['FileController_downloadGroupFile']['parameters']['path'];
type GetGroupFileQuery = operations['FileController_downloadGroupFile']['parameters']['query'];
type GetGroupFileHeaders = operations['FileController_downloadGroupFile']['parameters']['header'];

interface GetGroupFileProps {
  path: GetGroupFilePath;
  query: GetGroupFileQuery;
  headers?: OmitGroupIdInHeader<GetGroupFileHeaders>;
}

type GetGroupFileResponse = unknown;

export async function getGroupFile({
  path,
  query,
  headers,
}: GetGroupFileProps): Promise<GetGroupFileResponse | false> {
  const response = await authenticateRequest<GetGroupFileResponse>({
    method: 'get',
    url: `/api/v1/files/group/${path.fileUuid}`,
    headers,
    params: query,
    isDownload: true,
  });

  console.log('getGroupFile', { response });
  return response;
}

export type { GetGroupFilePath, GetGroupFileResponse };
