import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteMemberPath =
  operations['AdminGroupMemberController_deleteGroupMember']['parameters']['path'];
type DeleteMemberHeaders =
  operations['AdminGroupMemberController_deleteGroupMember']['parameters']['header'];

interface DeleteMemberCategoryProps {
  path: DeleteMemberPath;
  headers?: OmitGroupIdInHeader<DeleteMemberHeaders>;
}

type DeleteMemberResponse = number;

export async function deleteMember({
  path,
  headers,
}: DeleteMemberCategoryProps): Promise<DeleteMemberResponse | false> {
  const response = await authenticateRequest<DeleteMemberResponse>({
    method: 'delete',
    url: `/api/v1/admin/members/${path.groupMemberId}`,
    headers,
  });

  console.log('deleteMember', { response });
  return response;
}
