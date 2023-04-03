import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetNoticesQuery = operations['AdminNoticeController_getNoticeList']['parameters']['query'];
type GetNoticesHeaders = operations['AdminNoticeController_getNoticeList']['parameters']['header'];

interface GetNoticesProps {
  query: GetNoticesQuery;
  headers?: OmitGroupIdInHeader<GetNoticesHeaders>;
}

type GetNoticesResponse = components['schemas']['List$Notice$Cbwe92YYn1sQ4w7UU6OECg'];

export async function getNotices({
  query,
  headers,
}: GetNoticesProps): Promise<GetNoticesResponse | false> {
  const response = await authenticateRequest<GetNoticesResponse>({
    method: 'get',
    url: `/api/v1/admin/notices`,
    headers,
    params: query,
  });

  console.log('getNotices', { response });
  return response;
}

export type { GetNoticesQuery };
