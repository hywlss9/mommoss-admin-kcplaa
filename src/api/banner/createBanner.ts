import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateBannerData = components['schemas']['CreateGroupBannerDto'];
type CreateBannerHeaders =
  operations['AdminGroupBannerController_createGroupBanner']['parameters']['header'];

interface CreateBannerProps {
  data: CreateBannerData;
  headers?: OmitGroupIdInHeader<CreateBannerHeaders>;
}

type CreateBannerResponse = unknown;

export async function createBanner({
  data,
  headers,
}: CreateBannerProps): Promise<CreateBannerResponse | false> {
  const response = await authenticateRequest<CreateBannerResponse>({
    method: 'post',
    url: `/api/v1/admin/banners`,
    headers,
    data,
  });

  console.log('createBanner', { response });
  return response;
}

export type { CreateBannerData };
