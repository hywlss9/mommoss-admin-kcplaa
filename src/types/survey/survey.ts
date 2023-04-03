import type { EditorType } from '@ablestor/ablestor-survey';

import type { components } from '@type/model';

type Survey = components['schemas']['Survey$0KhelIcqssJxKfi0-pQ-Mw'];

interface AblestorSurvey extends EditorType.ISurveyResult {
  id: number;
}

interface SurveyOption {
  endDate?: string;
  status?: 0 | 1;
  total?: number;
  success?: number;
  responseCount?: string;
}

export type { Survey, AblestorSurvey, SurveyOption };
