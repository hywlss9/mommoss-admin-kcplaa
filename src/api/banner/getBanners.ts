import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetBannersQuery =
  operations['AdminGroupBannerController_getGroupBannerList']['parameters']['query'];
type GetBannersHeaders =
  operations['AdminGroupBannerController_getGroupBannerList']['parameters']['header'];

interface GetBannersProps {
  query: GetBannersQuery;
  headers?: OmitGroupIdInHeader<GetBannersHeaders>;
}

type GetBannersResponse = components['schemas']['List$GroupBanner$mZFLkyvTelC5g8XnyQrpOw'];

export async function getBanners({
  query,
  headers,
}: GetBannersProps): Promise<GetBannersResponse | false> {
  const response = await authenticateRequest<GetBannersResponse>({
    method: 'get',
    url: `/api/v1/admin/banners`,
    headers,
    params: query,
  });

  console.log('getBanners', { response });
  return response;
}

export type { GetBannersQuery, GetBannersResponse };
