import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdateFamilyEventPath = operations['AdminEventController_approveEvent']['parameters']['path'];
type UpdateFamilyEventData = components['schemas']['AdminApproveEventDto'];
type UpdateFamilyEventHeaders =
  operations['AdminEventController_approveEvent']['parameters']['header'];

interface UpdateFamilyEventProps {
  path: UpdateFamilyEventPath;
  data: UpdateFamilyEventData;
  headers?: OmitGroupIdInHeader<UpdateFamilyEventHeaders>;
}

type UpdateFamilyEventResponse = unknown;

export async function updateFamilyEvent({
  path,
  data,
  headers,
}: UpdateFamilyEventProps): Promise<UpdateFamilyEventResponse> {
  const response = await authenticateRequest<UpdateFamilyEventResponse>({
    method: 'patch',
    url: `/api/v1/admin/events/${path.eventId}/approve`,
    headers,
    data,
  });

  console.log('updateFamilyEvent', { response });
  return response;
}
