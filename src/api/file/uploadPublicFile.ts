import { authenticateRequest } from '@api/authenticateRequest';

type UploadPublicFileData = FormData;

interface UploadPublicFileProps {
  data: UploadPublicFileData;
}

type UploadPublicFileResponse = unknown;

export async function uploadPublicFile({
  data,
}: UploadPublicFileProps): Promise<UploadPublicFileResponse> {
  const response = await authenticateRequest<UploadPublicFileResponse>({
    method: 'post',
    url: `/api/v1/files/public`,
    data,
    isFile: true,
  });

  console.log('uploadPublicFile', { response });
  return response;
}

export type { UploadPublicFileData };
