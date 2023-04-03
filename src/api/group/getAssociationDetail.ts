import { authenticateRequest } from '@api/authenticateRequest';

import type { GetAssociationDetailResponse } from '@type/group';
import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetAssociationDetailPath =
  operations['AdminAssociationTeamController_getAssociationTeam']['parameters']['path'];
type GetAssociationDetailHeaders =
  operations['AdminAssociationTeamController_getAssociationTeam']['parameters']['header'];

interface GetAssociationDetailProps {
  path: GetAssociationDetailPath;
  headers?: OmitGroupIdInHeader<GetAssociationDetailHeaders>;
}

export async function getAssociationDetail({
  path,
  headers,
}: GetAssociationDetailProps): Promise<GetAssociationDetailResponse> {
  const response = await authenticateRequest<GetAssociationDetailResponse>({
    method: 'get',
    url: `/api/v1/admin/associations/teams/${path.teamId}`,
    headers,
  });

  console.log('getAssociationDetail', { response });
  return response;
}
