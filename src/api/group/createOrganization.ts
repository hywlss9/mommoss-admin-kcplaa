import { authenticateRequest } from '@api/authenticateRequest';

import type { CreateOrganizationData } from '@type/group';
import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateOrganizationHeaders =
  operations['AdminOrganizationTeamController_addOrganizationTeam']['parameters']['header'];

interface CreateOrganizationProps {
  data: CreateOrganizationData;
  headers?: OmitGroupIdInHeader<CreateOrganizationHeaders>;
}

type CreateOrganizationResponse = unknown;

export async function createOrganization({
  data,
  headers,
}: CreateOrganizationProps): Promise<CreateOrganizationResponse | false> {
  const response = await authenticateRequest<CreateOrganizationResponse>({
    method: 'post',
    url: `/api/v1/admin/organizations/teams`,
    headers,
    data,
  });

  console.log('createOrganization', { response });
  return response;
}
