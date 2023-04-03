import type { EditorType } from '@ablestor/ablestor-survey';

import type { Survey } from '@type/survey';
import type { Get } from '@type/util';

interface UpdateSurveyModalProps {
  surveyId: Survey['id'];
}
type GetSurveyDetailQuestionArr = Array<Get<EditorType.ISurveyContent> & { id: number }>;

interface UpdateSurveyData extends EditorType.ISurveyResult {
  questions: Array<Get<EditorType.ISurveyContent> & { id?: number }>;
}

export type { UpdateSurveyModalProps, UpdateSurveyData, GetSurveyDetailQuestionArr };
