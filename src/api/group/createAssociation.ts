import { authenticateRequest } from '@api/authenticateRequest';

import type { CreateAssociationData } from '@type/group';
import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateAssociationHeaders =
  operations['AdminAssociationTeamController_addAssociationTeam']['parameters']['header'];

interface CreateAssociationProps {
  data: CreateAssociationData;
  headers?: OmitGroupIdInHeader<CreateAssociationHeaders>;
}

type CreateAssociationResponse = unknown;

export async function createAssociation({
  data,
  headers,
}: CreateAssociationProps): Promise<CreateAssociationResponse | false> {
  const response = await authenticateRequest<CreateAssociationResponse>({
    method: 'post',
    url: `/api/v1/admin/associations/teams`,
    headers,
    data,
  });

  console.log('createAssociation', { response });
  return response;
}
