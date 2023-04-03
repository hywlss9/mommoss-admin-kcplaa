import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type UpdateSurveyQuestionPath =
  operations['AdminSurveyController_updateQuestion']['parameters']['path'];
type UpdateSurveyQuestionData = components['schemas']['UpdateSurveyQuestionDto'];
type UpdateSurveyQuestionHeaders =
  operations['AdminSurveyController_updateQuestion']['parameters']['header'];

interface UpdateSurveyQuestionProps {
  path: UpdateSurveyQuestionPath;
  data: UpdateSurveyQuestionData;
  headers?: OmitGroupIdInHeader<UpdateSurveyQuestionHeaders>;
}

type UpdateSurveyQuestionResponse = number;

export async function updateSurveyQuestion({
  path,
  data,
  headers,
}: UpdateSurveyQuestionProps): Promise<UpdateSurveyQuestionResponse> {
  const response = await authenticateRequest<UpdateSurveyQuestionResponse>({
    method: 'patch',
    url: `/api/v1/admin/surveys/${path.surveyId}/questions/${path.questionId}`,
    headers,
    data,
  });

  console.log('updateSurveyQuestion', { response });
  return response;
}
