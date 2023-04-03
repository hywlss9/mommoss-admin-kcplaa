import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetSurveyDetailPath = operations['AdminSurveyController_getSurvey']['parameters']['path'];
type GetSurveyDetailHeaders = operations['AdminSurveyController_getSurvey']['parameters']['header'];

interface GetSurveyDetailProps {
  path: GetSurveyDetailPath;
  headers?: OmitGroupIdInHeader<GetSurveyDetailHeaders>;
}

type GetSurveyDetailResponse = components['schemas']['Survey$XTLPmAfq-V39AwN2J_RyWw'];

export async function getSurveyDetail({
  path,
  headers,
}: GetSurveyDetailProps): Promise<GetSurveyDetailResponse> {
  const response = await authenticateRequest<GetSurveyDetailResponse>({
    method: 'get',
    url: `/api/v1/admin/surveys/${path.surveyId}`,
    headers,
  });

  console.log('getSurveyDetail', { response });
  return response;
}

export type { GetSurveyDetailPath, GetSurveyDetailResponse };
