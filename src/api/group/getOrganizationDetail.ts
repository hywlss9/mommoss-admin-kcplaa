import { authenticateRequest } from '@api/authenticateRequest';

import type { GetOrganizationDetailResponse } from '@type/group';
import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetOrganizationDetailPath =
  operations['AdminOrganizationTeamController_getOrganizationTeam']['parameters']['path'];
type GetOrganizationDetailHeaders =
  operations['AdminOrganizationTeamController_getOrganizationTeam']['parameters']['header'];

interface GetOrganizationDetailProps {
  path: GetOrganizationDetailPath;
  headers?: OmitGroupIdInHeader<GetOrganizationDetailHeaders>;
}

export async function getOrganizationDetail({
  path,
  headers,
}: GetOrganizationDetailProps): Promise<GetOrganizationDetailResponse | false> {
  const response = await authenticateRequest<GetOrganizationDetailResponse>({
    method: 'get',
    url: `/api/v1/admin/organizations/teams/${path.teamId}`,
    headers,
  });

  console.log('getOrganizationDetail', { response });
  return response;
}
