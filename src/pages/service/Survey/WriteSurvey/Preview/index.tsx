import { Viewer } from '@ablestor/ablestor-survey';

import colors from '@constants/colors';

import Preview from '@components/Preview';

import * as S from './styled';
import type * as T from './type';

function WriteSurveyPreview({ survey }: T.WriteSurveyPreviewProps) {
  return (
    <Preview backgroundColor={colors.WHITE}>
      <S.Container>
        {/* TODO: 범위 선택, 날짜, 시간 안됨 */}
        {survey && (
          <Viewer survey={survey} submitButtonOptions={{ text: '설문 저장', visible: true }} />
        )}
      </S.Container>
    </Preview>
  );
}

export default WriteSurveyPreview;
