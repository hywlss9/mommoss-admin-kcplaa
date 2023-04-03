import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type PostVideoData = components['schemas']['CreateVideoPostDto'];
type PostVideoHeaders =
  operations['AdminVideoPostController_createVideoPost']['parameters']['header'];

interface PostVideoProps {
  data: PostVideoData;
  headers?: OmitGroupIdInHeader<PostVideoHeaders>;
}

type PostVideoResponse = unknown;

export async function postVideo({
  data,
  headers,
}: PostVideoProps): Promise<PostVideoResponse | false> {
  const response = await authenticateRequest<PostVideoResponse>({
    method: 'post',
    url: `/api/v1/admin/video-posts`,
    headers,
    data,
  });

  console.log('postVideo', { response });
  return response;
}

export type { PostVideoData };
