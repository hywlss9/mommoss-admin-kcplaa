import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteOrganizationMemberPath =
  operations['AdminOrganizationTeamController_removeOrganizationTeam']['parameters']['path'];
type DeleteOrganizationMemberData = components['schemas']['RemoveMembersFromTeamDto'];
type DeleteOrganizationMemberHeaders =
  operations['AdminOrganizationTeamController_removeOrganizationTeam']['parameters']['header'];

interface DeleteOrganizationMemberCategoryProps {
  path: DeleteOrganizationMemberPath;
  data: DeleteOrganizationMemberData;
  headers?: OmitGroupIdInHeader<DeleteOrganizationMemberHeaders>;
}

type DeleteOrganizationMemberResponse = number;

export async function deleteOrganizationMember({
  path,
  data,
  headers,
}: DeleteOrganizationMemberCategoryProps): Promise<DeleteOrganizationMemberResponse | false> {
  const response = await authenticateRequest<DeleteOrganizationMemberResponse>({
    method: 'delete',
    url: `/api/v1/admin/organizations/teams/${path.teamId}/members`,
    headers,
    data,
  });

  console.log('deleteOrganizationMember', { response });
  return response;
}
