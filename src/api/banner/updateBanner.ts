import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdateBannerPath =
  operations['AdminGroupBannerController_updateGroupBanner']['parameters']['path'];
type UpdateBannerData = components['schemas']['UpdateGroupBannerDto'];
type UpdateBannerHeaders =
  operations['AdminGroupBannerController_updateGroupBanner']['parameters']['header'];

interface UpdateBannerProps {
  path: UpdateBannerPath;
  data: UpdateBannerData;
  headers?: OmitGroupIdInHeader<UpdateBannerHeaders>;
}

type UpdateBannerResponse = number;

export async function updateBanner({
  path,
  data,
  headers,
}: UpdateBannerProps): Promise<UpdateBannerResponse | false> {
  const response = await authenticateRequest<UpdateBannerResponse>({
    method: 'patch',
    url: `/api/v1/admin/banners/${path.groupBannerId}`,
    headers,
    data,
  });

  console.log('updateBanner', { response });
  return response;
}
