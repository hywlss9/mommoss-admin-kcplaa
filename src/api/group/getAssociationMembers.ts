import { authenticateRequest } from '@api/authenticateRequest';

import type { GetAssociationMembersResponse } from '@type/group';
import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetAssociationMembersQuery =
  operations['AdminKcplaaMemberController_getKcplaaMemberList']['parameters']['query'];
type GetAssociationMembersHeaders =
  operations['AdminKcplaaMemberController_getKcplaaMemberList']['parameters']['header'];

interface GetAssociationMembersProps {
  query: GetAssociationMembersQuery;
  headers?: OmitGroupIdInHeader<GetAssociationMembersHeaders>;
}

export async function getAssociationMembers({
  query,
  headers,
}: GetAssociationMembersProps): Promise<GetAssociationMembersResponse> {
  const response = await authenticateRequest<GetAssociationMembersResponse>({
    method: 'get',
    url: `/api/v1/admin/kcplaa/members`,
    headers,
    params: query,
  });

  console.log('getAssociationMembers', { response });
  return response;
}

export type { GetAssociationMembersQuery };
