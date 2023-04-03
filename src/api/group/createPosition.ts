import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreatePositionData = components['schemas']['CreateGroupPositionDto'];

type CreatePositionHeaders =
  operations['AdminGroupPositionController_addGroupPosition']['parameters']['header'];

interface CreatePositionProps {
  data: CreatePositionData;
  headers?: OmitGroupIdInHeader<CreatePositionHeaders>;
}

type CreatePositionResponse = unknown;

export async function createPosition({
  data,
  headers,
}: CreatePositionProps): Promise<CreatePositionResponse> {
  const response = await authenticateRequest<CreatePositionResponse>({
    method: 'post',
    url: `/api/v1/admin/positions`,
    headers,
    data,
  });

  console.log('createPosition', { response });
  return response;
}
