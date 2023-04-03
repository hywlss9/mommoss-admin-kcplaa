import { authenticateRequest } from '@api/authenticateRequest';

import type { CreateAssociationMembersData } from '@type/group';
import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateAssociationMembersPath =
  operations['AdminAssociationTeamMemberController_addGroupTeamMember']['parameters']['path'];
type CreateAssociationMembersHeaders =
  operations['AdminAssociationTeamMemberController_addGroupTeamMember']['parameters']['header'];

interface CreateAssociationMembersProps {
  path: CreateAssociationMembersPath;
  data: CreateAssociationMembersData;
  headers?: OmitGroupIdInHeader<CreateAssociationMembersHeaders>;
}

type CreateAssociationMembersResponse = unknown;

export async function createAssociationMembers({
  path,
  data,
  headers,
}: CreateAssociationMembersProps): Promise<CreateAssociationMembersResponse | false> {
  const response = await authenticateRequest<CreateAssociationMembersResponse>({
    method: 'post',
    url: `/api/v1/admin/associations/teams/${path.teamId}/members`,
    headers,
    data,
  });

  console.log('createAssociationMembers', { response });
  return response;
}
