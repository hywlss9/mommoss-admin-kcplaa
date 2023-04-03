import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteVideoData = components['schemas']['BulkDeleteVideoPostDto'];
type DeleteVideoHeaders =
  operations['AdminVideoPostController_bulkDeleteVideoPost']['parameters']['header'];

interface DeleteVideoProps {
  data: DeleteVideoData;
  headers?: OmitGroupIdInHeader<DeleteVideoHeaders>;
}

type DeleteVideoResponse = unknown;

export async function deleteVideos({
  data,
  headers,
}: DeleteVideoProps): Promise<DeleteVideoResponse | false> {
  const response = await authenticateRequest<DeleteVideoResponse>({
    method: 'delete',
    url: `/api/v1/admin/video-posts`,
    headers,
    data,
  });

  console.log('deleteVideo', { response });
  return response;
}
