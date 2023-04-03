import { authenticateRequest } from '@api/authenticateRequest';

import type { GetAssociationResponse } from '@type/group';
import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetAssociationQuery =
  operations['AdminAssociationTeamController_getAssociationTeamList']['parameters']['query'];
type GetAssociationHeaders =
  operations['AdminAssociationTeamController_getAssociationTeamList']['parameters']['header'];

interface GetAssociationProps {
  query: GetAssociationQuery;
  headers?: OmitGroupIdInHeader<GetAssociationHeaders>;
}

export async function getAssociation({
  query,
  headers,
}: GetAssociationProps): Promise<GetAssociationResponse> {
  const response = await authenticateRequest<GetAssociationResponse>({
    method: 'get',
    url: `/api/v1/admin/associations/teams`,
    headers,
    params: query,
  });

  console.log('getAssociation', { response });
  return response;
}

export type { GetAssociationQuery };
