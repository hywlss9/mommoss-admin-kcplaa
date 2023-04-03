import { authenticateRequest } from '@api/authenticateRequest';

import type { CreateMembersData } from '@type/group';
import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateMembersHeaders =
  operations['AdminGroupOrganizationMemberController_bulkCreateOrganizationMember']['parameters']['header'];

interface CreateMembersProps {
  data: CreateMembersData;
  headers?: OmitGroupIdInHeader<CreateMembersHeaders>;
}

type CreateMembersResponse = components['schemas']['BulkCreateGroupOrganizationMemberResponse'];

export async function createMembers({
  data,
  headers,
}: CreateMembersProps): Promise<CreateMembersResponse> {
  const response = await authenticateRequest<CreateMembersResponse>({
    method: 'post',
    url: `/api/v1/admin/organizations/members/bulk`,
    headers,
    data,
  });

  console.log('createMembers', { response });
  return response;
}
