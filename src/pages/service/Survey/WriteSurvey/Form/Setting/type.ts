import type { Dispatch, SetStateAction } from 'react';

import type { SurveySettingModel } from '@pages/service/Survey/WriteSurvey/Form/type';

interface SurveySettingProps {
  surveySetting: SurveySettingModel;
  setSurveySetting: Dispatch<SetStateAction<SurveySettingModel>>;
}

export type { SurveySettingProps };
