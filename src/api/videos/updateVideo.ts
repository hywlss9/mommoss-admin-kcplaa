import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdateVideoPath = operations['AdminVideoPostController_updateVideoPost']['parameters']['path'];
type UpdateVideoData = components['schemas']['UpdateVideoPostDto'];
type UpdateVideoHeaders =
  operations['AdminVideoPostController_updateVideoPost']['parameters']['header'];

interface UpdateVideoProps {
  path: UpdateVideoPath;
  data: UpdateVideoData;
  headers?: OmitGroupIdInHeader<UpdateVideoHeaders>;
}

type UpdateVideoResponse = unknown;

export async function updateVideo({ path, data, headers }: UpdateVideoProps) {
  const response = await authenticateRequest<UpdateVideoResponse>({
    method: 'patch',
    url: `/api/v1/admin/video-posts/${path.videoPostId}`,
    headers,
    data,
  });

  console.log('updateVideo', { response });
  return response;
}
