import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteBannerPath =
  operations['AdminGroupBannerController_deleteGroupBanner']['parameters']['path'];
type DeleteBannerHeaders =
  operations['AdminGroupBannerController_deleteGroupBanner']['parameters']['header'];

interface DeleteBannerProps {
  path: DeleteBannerPath;
  headers?: OmitGroupIdInHeader<DeleteBannerHeaders>;
}

type DeleteBannerResponse = unknown;

export async function deleteBanner({
  path,
  headers,
}: DeleteBannerProps): Promise<DeleteBannerResponse | false> {
  const response = await authenticateRequest<DeleteBannerResponse>({
    method: 'delete',
    url: `/api/v1/admin/banners/${path.groupBannerId}`,
    headers,
  });

  console.log('deleteBanner', { response });
  return response;
}
