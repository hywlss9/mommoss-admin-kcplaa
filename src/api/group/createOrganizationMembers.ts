import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateOrganizationMembersPath =
  operations['AdminOrganizationTeamMemberController_addGroupTeamMember']['parameters']['path'];
type CreateOrganizationMembersData = components['schemas']['AddMembersToOrganizationTeamDto'];
type CreateOrganizationMembersHeaders =
  operations['AdminOrganizationTeamMemberController_addGroupTeamMember']['parameters']['header'];

interface CreateOrganizationMembersProps {
  path: CreateOrganizationMembersPath;
  data: CreateOrganizationMembersData;
  headers?: OmitGroupIdInHeader<CreateOrganizationMembersHeaders>;
}

type CreateOrganizationMembersResponse = unknown;

export async function createOrganizationMembers({
  path,
  data,
  headers,
}: CreateOrganizationMembersProps): Promise<CreateOrganizationMembersResponse> {
  const response = await authenticateRequest<CreateOrganizationMembersResponse>({
    method: 'post',
    url: `/api/v1/admin/organizations/teams/${path.teamId}/members`,
    headers,
    data,
  });

  console.log('createOrganizationMembers', { response });
  return response;
}
