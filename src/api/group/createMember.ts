import { authenticateRequest } from '@api/authenticateRequest';

import type { CreateMemberData } from '@type/group';
import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateMemberHeaders =
  operations['AdminGroupOrganizationMemberController_createOrganizationMember']['parameters']['header'];

interface CreateMemberProps {
  data: CreateMemberData;
  headers?: OmitGroupIdInHeader<CreateMemberHeaders>;
}

type CreateMemberResponse = components['schemas']['CreateGroupOrganizationMemberResponse'];

export async function createMember({
  data,
  headers,
}: CreateMemberProps): Promise<CreateMemberResponse | false> {
  const response = await authenticateRequest<CreateMemberResponse>({
    method: 'post',
    url: `/api/v1/admin/organizations/members`,
    headers,
    data,
  });

  console.log('createMember', { response });
  return response;
}
