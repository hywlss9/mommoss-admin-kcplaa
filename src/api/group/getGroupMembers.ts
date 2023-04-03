import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetGroupMembersQuery =
  operations['AdminGroupMemberController_getGroupMemberList']['parameters']['query'];
type GetGroupMembersHeaders =
  operations['AdminGroupMemberController_getGroupMemberList']['parameters']['header'];

interface GetGroupMembersProps {
  query: GetGroupMembersQuery;
  headers?: OmitGroupIdInHeader<GetGroupMembersHeaders>;
}

type GetGroupMembersResponse = components['schemas']['List$GroupMember$ibzP2MEdd82eZLNY-2zkUQ'];

export async function getGroupMembers({
  query,
  headers,
}: GetGroupMembersProps): Promise<GetGroupMembersResponse | false> {
  const response = await authenticateRequest<GetGroupMembersResponse>({
    method: 'get',
    url: '/api/v1/admin/members',
    headers,
    params: query,
  });

  console.log('getGroupMembers', { response });
  return response;
}

export type { GetGroupMembersQuery, GetGroupMembersResponse };
