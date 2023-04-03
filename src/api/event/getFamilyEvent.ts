import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetFamilyEventPath = operations['AdminEventController_getEventRequest']['parameters']['path'];
type GetFamilyEventHeaders =
  operations['AdminEventController_getEventRequest']['parameters']['header'];

interface GetFamilyEventProps {
  path: GetFamilyEventPath;
  headers?: OmitGroupIdInHeader<GetFamilyEventHeaders>;
}

type GetFamiyEventResponse = components['schemas']['Event$4_H5TmjlkNHtTJ3G3Hrwuw'];

export async function getFamilyEvent({
  path,
  headers,
}: GetFamilyEventProps): Promise<GetFamiyEventResponse> {
  const response = await authenticateRequest<GetFamiyEventResponse>({
    method: 'get',
    url: `/api/v1/admin/events/${path.eventId}`,
    headers,
  });

  console.log('getFamilyEvent', { response });
  return response;
}

export type { GetFamilyEventPath, GetFamiyEventResponse };
