import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdateOrganizationPath =
  operations['AdminOrganizationTeamController_updateOrganizationTeam']['parameters']['path'];
type UpdateOrganizationData = components['schemas']['UpdateOrganizationTeamDto'];
type UpdateOrganizationHeaders =
  operations['AdminOrganizationTeamController_updateOrganizationTeam']['parameters']['header'];

interface UpdateOrganizationProps {
  path: UpdateOrganizationPath;
  data: UpdateOrganizationData;
  headers?: OmitGroupIdInHeader<UpdateOrganizationHeaders>;
}

type UpdateOrganizationResponse = number | boolean;

export async function updateOrganization({
  path,
  data,
  headers,
}: UpdateOrganizationProps): Promise<UpdateOrganizationResponse> {
  const response = await authenticateRequest<UpdateOrganizationResponse>({
    method: 'patch',
    url: `/api/v1/admin/organizations/teams/${path.teamId}`,
    headers,
    data,
  });

  console.log('updateOrganization', { response });
  return response;
}
