import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type PostSurveysData = components['schemas']['CreateSurveyDto'];
type PostSurveysHeaders = operations['AdminSurveyController_createSurvey']['parameters']['header'];

interface PostSurveysProps {
  data: PostSurveysData;
  headers?: OmitGroupIdInHeader<PostSurveysHeaders>;
}

type PostSurveysResponse = unknown;

export async function postSurvey({
  data,
  headers,
}: PostSurveysProps): Promise<PostSurveysResponse | false> {
  const response = await authenticateRequest<PostSurveysResponse>({
    method: 'post',
    url: `/api/v1/admin/surveys`,
    headers,
    data,
  });

  console.log('postSurvey', { response });
  return response;
}

export type { PostSurveysData };
