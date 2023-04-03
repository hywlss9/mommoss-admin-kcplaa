import type { Dispatch, SetStateAction } from 'react';

import type { PostSurveysData } from '@api/survey/postSurvey';

import type { AblestorSurvey } from '@type/survey';

interface WriteSurveyFormProps {
  survey?: AblestorSurvey;
  setSurvey?: Dispatch<SetStateAction<AblestorSurvey | undefined>>;
}

type SurveySettingModel = Pick<
  PostSurveysData,
  'multiple' | 'editable' | 'secure' | 'startedAt' | 'finishedAt' | 'maxResponses' | 'visible'
>;

export type { WriteSurveyFormProps, SurveySettingModel };
