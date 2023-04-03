import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteAssociationMembersPath =
  operations['AdminAssociationTeamMemberController_removeGroupTeamMember']['parameters']['path'];
type DeleteAssociationMembersData = components['schemas']['RemoveMembersFromTeamDto'];
type DeleteAssociationMembersHeaders =
  operations['AdminAssociationTeamMemberController_removeGroupTeamMember']['parameters']['header'];

interface DeleteAssociationMembersCategoryProps {
  path: DeleteAssociationMembersPath;
  data: DeleteAssociationMembersData;
  headers?: OmitGroupIdInHeader<DeleteAssociationMembersHeaders>;
}

type DeleteAssociationMembersResponse = number;

export async function deleteAssociationMembers({
  path,
  data,
  headers,
}: DeleteAssociationMembersCategoryProps): Promise<DeleteAssociationMembersResponse | false> {
  const response = await authenticateRequest<DeleteAssociationMembersResponse>({
    method: 'delete',
    url: `/api/v1/admin/associations/teams/${path.teamId}/members`,
    headers,
    data,
  });

  console.log('deleteAssociationMembers', { response });
  return response;
}
