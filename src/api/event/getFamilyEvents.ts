import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetFamilyEventsQuery =
  operations['AdminEventController_getEventRequestList']['parameters']['query'];
type GetFamilyEventsHeaders =
  operations['AdminEventController_getEventRequestList']['parameters']['header'];

interface GetFamilyEventsProps {
  query: GetFamilyEventsQuery;
  headers?: OmitGroupIdInHeader<GetFamilyEventsHeaders>;
}

type GetFamiyEventsResponse = components['schemas']['List$Event$4_H5TmjlkNHtTJ3G3Hrwuw'];

export async function getFamilyEvents({
  query,
  headers,
}: GetFamilyEventsProps): Promise<GetFamiyEventsResponse> {
  const response = await authenticateRequest<GetFamiyEventsResponse>({
    method: 'get',
    url: `/api/v1/admin/events`,
    headers,
    params: query,
  });

  console.log('getFamilyEvents', { response });
  return response;
}

export type { GetFamilyEventsQuery, GetFamiyEventsResponse };
