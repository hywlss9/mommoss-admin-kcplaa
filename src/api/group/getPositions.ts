import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetPositionsQuery =
  operations['AdminGroupPositionController_getGroupPositionList']['parameters']['query'];
type GetPositionsHeaders =
  operations['AdminGroupPositionController_getGroupPositionList']['parameters']['header'];

interface GetPositionsProps {
  query: GetPositionsQuery;
  headers?: OmitGroupIdInHeader<GetPositionsHeaders>;
}

type GetPositionsResponse = components['schemas']['List$GroupPosition$mZFLkyvTelC5g8XnyQrpOw'];

export async function getPositions({
  query,
  headers,
}: GetPositionsProps): Promise<GetPositionsResponse | false> {
  const response = await authenticateRequest<GetPositionsResponse>({
    method: 'get',
    url: `/api/v1/admin/positions`,
    headers,
    params: query,
  });

  console.log('getPositions', { response });
  return response;
}

export type { GetPositionsQuery, GetPositionsResponse };
