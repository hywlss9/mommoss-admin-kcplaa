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

type GetFamilyEventResponse = components['schemas']['Event$XVVAi-yfwQ5XUBu7jTmzrQ'];

export async function getFamilyEvent({
  path,
  headers,
}: GetFamilyEventProps): Promise<GetFamilyEventResponse | false> {
  const response = await authenticateRequest<GetFamilyEventResponse>({
    method: 'get',
    url: `/api/v1/admin/events/${path.eventId}`,
    headers,
  });

  console.log('getFamilyEvent', { response });
  return response;
}

export type { GetFamilyEventPath, GetFamilyEventResponse };
