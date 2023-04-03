import { useState } from 'react';

import { Col, Row } from 'antd';

import FormContainer from '@components/FormContainer';

import type { AblestorSurvey } from '@type/survey';

import WriteSurveyForm from './Form';
import WriteSurveyPreview from './Preview';
import * as S from './styled';

function WriteSurvey() {
  //TODO: undefined 체크
  const [survey, setSurvey] = useState<AblestorSurvey>();

  return (
    <S.Container>
      <Row gutter={64} justify='space-between'>
        <Col md={14} sm={12} xs={24} className='form'>
          <FormContainer className='not-numbers'>
            <WriteSurveyForm survey={survey} setSurvey={setSurvey} />
          </FormContainer>
        </Col>
        <Col md={10} sm={12} xs={24}>
          <WriteSurveyPreview survey={survey} />
        </Col>
      </Row>
    </S.Container>
  );
}

export default WriteSurvey;
