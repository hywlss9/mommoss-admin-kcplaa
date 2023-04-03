import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteSurveyData = components['schemas']['BulkDeleteSurveyDto'];
type DeleteSurveyHeaders =
  operations['AdminSurveyController_bulkDeleteSurvey']['parameters']['header'];

interface DeleteSurveyCategoryProps {
  data: DeleteSurveyData;
  headers?: OmitGroupIdInHeader<DeleteSurveyHeaders>;
}

type DeleteSurveyResponse = unknown;

export async function deleteSurvey({
  data,
  headers,
}: DeleteSurveyCategoryProps): Promise<DeleteSurveyResponse | false> {
  const response = await authenticateRequest<DeleteSurveyResponse>({
    method: 'delete',
    url: `/api/v1/admin/surveys`,
    headers,
    data,
  });

  console.log('deleteSurvey', { response });
  return response;
}
