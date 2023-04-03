import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteAssociationPath =
  operations['AdminAssociationTeamController_removeAssociationTeam']['parameters']['path'];
type DeleteAssociationHeaders =
  operations['AdminAssociationTeamController_removeAssociationTeam']['parameters']['header'];

interface DeleteAssociationCategoryProps {
  path: DeleteAssociationPath;
  headers?: OmitGroupIdInHeader<DeleteAssociationHeaders>;
}

type DeleteAssociationResponse = unknown;

export async function deleteAssociation({
  path,
  headers,
}: DeleteAssociationCategoryProps): Promise<DeleteAssociationResponse> {
  const response = await authenticateRequest<DeleteAssociationResponse>({
    method: 'delete',
    url: `/api/v1/admin/associations/teams/${path.teamId}`,
    headers,
  });

  console.log('deleteAssociation', { response });
  return response;
}
