import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';

type GetPublicFilePath = operations['FileController_downloadPublicFile']['parameters']['path'];
type GetPublicFileQuery = operations['FileController_downloadPublicFile']['parameters']['query'];

interface GetPublicFileProps {
  path: GetPublicFilePath;
  query: GetPublicFileQuery;
}

type GetPublicFileResponse = unknown;

export async function getPublicFile({
  path,
  query,
}: GetPublicFileProps): Promise<GetPublicFileResponse | false> {
  const response = await authenticateRequest<GetPublicFileResponse>({
    method: 'get',
    url: `/api/v1/files/public/${path.fileUuid}`,
    params: query,
    isDownload: true,
  });

  console.log('getPublicFile', { response });
  return response;
}

export type { GetPublicFilePath, GetPublicFileResponse };
