import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type CreateSurveyQuestionPath =
  operations['AdminSurveyController_addQuestion']['parameters']['path'];
type CreateSurveyQuestionData = components['schemas']['CreateSurveyQuestionDto'];
type CreateSurveyQuestionHeaders =
  operations['AdminSurveyController_addQuestion']['parameters']['header'];

interface CreateSurveyQuestionProps {
  path: CreateSurveyQuestionPath;
  data: CreateSurveyQuestionData;
  headers?: OmitGroupIdInHeader<CreateSurveyQuestionHeaders>;
}

type CreateSurveyQuestionResponse = unknown;

export async function createSurveyQuestion({
  path,
  data,
  headers,
}: CreateSurveyQuestionProps): Promise<CreateSurveyQuestionResponse | false> {
  const response = await authenticateRequest<CreateSurveyQuestionResponse>({
    method: 'post',
    url: `/api/v1/admin/surveys/${path.surveyId}/questions`,
    headers,
    data,
  });

  console.log('createSurveyQuestion', { response });
  return response;
}

export type { CreateSurveyQuestionData };
