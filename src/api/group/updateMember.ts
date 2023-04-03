import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdateMemberPath =
  operations['AdminGroupMemberController_updateGroupMember']['parameters']['path'];
type UpdateMemberData = components['schemas']['UpdateGroupOrganizationMemberDto'];
type UpdateMemberHeaders =
  operations['AdminGroupMemberController_updateGroupMember']['parameters']['header'];

interface UpdateMemberProps {
  path: UpdateMemberPath;
  data: UpdateMemberData;
  headers?: OmitGroupIdInHeader<UpdateMemberHeaders>;
}

type UpdateMemberResponse = unknown;

export async function updateMember({
  path,
  data,
  headers,
}: UpdateMemberProps): Promise<UpdateMemberResponse | false> {
  const response = await authenticateRequest<UpdateMemberResponse>({
    method: 'patch',
    url: `/api/v1/admin/members/${path.groupMemberId}`,
    headers,
    data,
  });

  console.log('updateMember', { response });
  return response;
}
