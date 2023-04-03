import type { GetSurveysResponse } from '@api/survey/getSurveys';

import type { AntdTableDataSource } from '@type/antd-table';
import type { Get } from '@type/util';

type GetSurveysResponseItem = Get<GetSurveysResponse['rows']>;

type SurveyTableDataSource = AntdTableDataSource<GetSurveysResponseItem>;

type SurveyTableData = Get<SurveyTableDataSource>;

export type { SurveyTableDataSource, SurveyTableData };
