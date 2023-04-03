import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteOrganizationPath =
  operations['AdminOrganizationTeamController_removeOrganizationTeam']['parameters']['path'];
type DeleteOrganizationHeaders =
  operations['AdminOrganizationTeamController_removeOrganizationTeam']['parameters']['header'];

interface DeleteOrganizationCategoryProps {
  path: DeleteOrganizationPath;
  headers?: OmitGroupIdInHeader<DeleteOrganizationHeaders>;
}

type DeleteOrganizationResponse = number | boolean;

export async function deleteOrganization({
  path,
  headers,
}: DeleteOrganizationCategoryProps): Promise<DeleteOrganizationResponse | false> {
  const response = await authenticateRequest<DeleteOrganizationResponse>({
    method: 'delete',
    url: `/api/v1/admin/organizations/teams/${path.teamId}`,
    headers,
  });

  console.log('deleteOrganization', { response });
  return response;
}
