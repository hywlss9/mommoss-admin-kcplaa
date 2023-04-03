import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetVideosQuery =
  operations['AdminVideoPostController_getVideoPostList']['parameters']['query'];
type GetVideosHeaders =
  operations['AdminVideoPostController_getVideoPostList']['parameters']['header'];

interface GetVideosProps {
  query: GetVideosQuery;
  headers?: OmitGroupIdInHeader<GetVideosHeaders>;
}

type GetVideosResponse = components['schemas']['List$VideoPost$mZFLkyvTelC5g8XnyQrpOw'];

export async function getVideos({
  query,
  headers,
}: GetVideosProps): Promise<GetVideosResponse | false> {
  const response = await authenticateRequest<GetVideosResponse>({
    method: 'get',
    url: `/api/v1/admin/video-posts`,
    headers,
    params: query,
  });

  console.log('getVideos', { response });
  return response;
}

export type { GetVideosQuery, GetVideosResponse };
