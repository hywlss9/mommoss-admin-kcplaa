import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdatePositionPath =
  operations['AdminGroupPositionController_updateGroupPosition']['parameters']['path'];
type UpdatePositionData = components['schemas']['UpdateGroupPositionDto'];
type UpdatePositionHeaders =
  operations['AdminGroupPositionController_updateGroupPosition']['parameters']['header'];

interface UpdatePositionProps {
  path: UpdatePositionPath;
  data: UpdatePositionData;
  headers?: OmitGroupIdInHeader<UpdatePositionHeaders>;
}

type UpdatePositionResponse = number;

export async function updatePosition({
  path,
  data,
  headers,
}: UpdatePositionProps): Promise<UpdatePositionResponse | false> {
  const response = await authenticateRequest<UpdatePositionResponse>({
    method: 'patch',
    url: `/api/v1/admin/positions/${path.positionId}`,
    headers,
    data,
  });

  console.log('updatePosition', { response });
  return response;
}
