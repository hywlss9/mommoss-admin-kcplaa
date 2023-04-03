import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdateSurveyPath = operations['AdminSurveyController_updateSurvey']['parameters']['path'];
type UpdateSurveyData = components['schemas']['UpdateSurveyDto'];
type UpdateSurveyHeaders = operations['AdminSurveyController_updateSurvey']['parameters']['header'];

interface UpdateSurveyProps {
  path: UpdateSurveyPath;
  data: UpdateSurveyData;
  headers?: OmitGroupIdInHeader<UpdateSurveyHeaders>;
}

type UpdateSurveyResponse = number;

export async function updateSurvey({
  path,
  data,
  headers,
}: UpdateSurveyProps): Promise<UpdateSurveyResponse | false> {
  const response = await authenticateRequest<UpdateSurveyResponse>({
    method: 'patch',
    url: `/api/v1/admin/surveys/${path.surveyId}`,
    headers,
    data,
  });

  console.log('updateSurvey', { response });
  return response;
}
