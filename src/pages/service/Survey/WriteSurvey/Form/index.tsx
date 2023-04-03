import { useState } from 'react';

import { Editor, useTheme } from '@ablestor/ablestor-survey';
import { Button, Divider, Popover, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { postSurvey } from '@api/survey/postSurvey';

import colors from '@constants/colors';

import SurveySetting from './Setting';
import * as S from './styled';
import type * as T from './type';

function WriteSurveyForm({ survey, setSurvey }: T.WriteSurveyFormProps) {
  const navigate = useNavigate();

  useTheme({ main: colors.NAVY_BLUE_ORIGIN });

  const [surveySetting, setSurveySetting] = useState<T.SurveySettingModel>({
    multiple: false,
    editable: false,
    secure: false,
    visible: true,
  });

  const submit = async () => {
    const currentSurvey = {
      ...survey,
      questions: survey?.questions.sort((a, b) => a.order - b.order) || [],
    };

    const { title, description, questions } = currentSurvey;

    const isBlank = questions.findIndex(({ type }) => type === 'blank');
    if (isBlank > -1) {
      message.warning('설문 유형이 선택되지 않은 설문이 있습니다.');
      return false;
    }

    console.log('설문 생성', {
      data: {
        title,
        description,
        questions,
        surveySetting,
      },
    });

    const response = await postSurvey({
      data: {
        title: title || '',
        description,
        questions,
        ...surveySetting,
      },
    });

    if (response) {
      message.success('설문을 생성했습니다.');
      navigate('/service/survey?menu=list');
    }
  };

  return (
    <S.Container>
      <Popover
        placement='bottomRight'
        trigger='click'
        overlayStyle={{ minWidth: '500px' }}
        content={
          <SurveySetting surveySetting={surveySetting} setSurveySetting={setSurveySetting} />
        }>
        <Button type='link'>설문 설정</Button>
      </Popover>

      <Editor
        blackList={['time', 'date']}
        onChange={data => setSurvey && setSurvey({ ...data, id: 0 })}
      />

      <Divider />

      {/* TODO: 알림메시지 발송 confirm */}
      <Button type='primary' onClick={submit}>
        생성하기
      </Button>
    </S.Container>
  );
}

export default WriteSurveyForm;
