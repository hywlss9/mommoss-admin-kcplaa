import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetBannerPath = operations['AdminGroupBannerController_getGroupBanner']['parameters']['path'];
type GetBannerHeaders =
  operations['AdminGroupBannerController_getGroupBanner']['parameters']['header'];

interface GetBannerProps {
  path: GetBannerPath;
  headers?: OmitGroupIdInHeader<GetBannerHeaders>;
}

type GetBannerResponse = components['schemas']['GroupBanner$mZFLkyvTelC5g8XnyQrpOw'];

export async function getBanner({
  path,
  headers,
}: GetBannerProps): Promise<GetBannerResponse | false> {
  const response = await authenticateRequest<GetBannerResponse>({
    method: 'get',
    url: `/api/v1/admin/banners/${path.groupBannerId}`,
    headers,
  });

  console.log('getBanner', { response });
  return response;
}

export type { GetBannerResponse };
