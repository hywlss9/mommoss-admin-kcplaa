import { authenticateRequest } from '@api/authenticateRequest';

import type { components, operations } from '@type/model';
import type { OmitGroupIdInHeader } from '@type/util';

type GetSurveysQuery = operations['AdminSurveyController_getSurveyList']['parameters']['query'];
type GetSurveysHeaders = operations['AdminSurveyController_getSurveyList']['parameters']['header'];

interface GetSurveysProps {
  query: GetSurveysQuery;
  headers?: OmitGroupIdInHeader<GetSurveysHeaders>;
}

type GetSurveysResponse = components['schemas']['List$Survey$h9t27cjaT6UA-eivxAOfCQ'];

export async function getSurveys({ query, headers }: GetSurveysProps): Promise<GetSurveysResponse> {
  const response = await authenticateRequest<GetSurveysResponse>({
    method: 'get',
    url: `/api/v1/admin/surveys`,
    headers,
    params: query,
  });

  console.log('getSurveys', { response });
  return response;
}

export type { GetSurveysQuery, GetSurveysResponse };
