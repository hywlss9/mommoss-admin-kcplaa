import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type DeleteSurveyQuestionPath =
  operations['AdminSurveyController_deleteQuestion']['parameters']['path'];
type DeleteSurveyQuestionHeaders =
  operations['AdminSurveyController_deleteQuestion']['parameters']['header'];

interface DeleteSurveyQuestionCategoryProps {
  path: DeleteSurveyQuestionPath;
  headers?: OmitGroupIdInHeader<DeleteSurveyQuestionHeaders>;
}

type DeleteSurveyQuestionResponse = number;

export async function deleteSurveyQuestion({
  path,
  headers,
}: DeleteSurveyQuestionCategoryProps): Promise<DeleteSurveyQuestionResponse | false> {
  const response = await authenticateRequest<DeleteSurveyQuestionResponse>({
    method: 'delete',
    url: `/api/v1/admin/surveys/${path.surveyId}/questions/${path.questionId}`,
    headers,
  });

  console.log('deleteSurveyQuestion', { response });
  return response;
}
