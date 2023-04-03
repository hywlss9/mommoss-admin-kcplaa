import { authenticateRequest } from '@api/authenticateRequest';

import type { GetOrganizationResponse } from '@type/group';
import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetOrganizationQuery =
  operations['AdminOrganizationTeamController_getOrganizationTeamList']['parameters']['query'];
type GetOrganizationHeaders =
  operations['AdminOrganizationTeamController_getOrganizationTeamList']['parameters']['header'];

interface GetOrganizationProps {
  query: GetOrganizationQuery;
  headers?: OmitGroupIdInHeader<GetOrganizationHeaders>;
}

export async function getOrganization({
  query,
  headers,
}: GetOrganizationProps): Promise<GetOrganizationResponse> {
  const response = await authenticateRequest<GetOrganizationResponse>({
    method: 'get',
    url: `/api/v1/admin/organizations/teams`,
    headers,
    params: query,
  });

  console.log('getOrganization', { response });
  return response;
}

export type { GetOrganizationQuery };
