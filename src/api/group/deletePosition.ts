import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeletePositionPath =
  operations['AdminGroupPositionController_removeGroupPosition']['parameters']['path'];
type DeletePositionHeaders =
  operations['AdminGroupPositionController_removeGroupPosition']['parameters']['header'];

interface DeletePositionCategoryProps {
  path: DeletePositionPath;
  headers?: OmitGroupIdInHeader<DeletePositionHeaders>;
}

type DeletePositionResponse = number;

export async function deletePosition({
  path,
  headers,
}: DeletePositionCategoryProps): Promise<DeletePositionResponse | false> {
  const response = await authenticateRequest<DeletePositionResponse>({
    method: 'delete',
    url: `/api/v1/admin/positions/${path.positionId}`,
    headers,
  });

  console.log('deletePosition', { response });
  return response;
}
