import { useState } from 'react';

import { Col, Row } from 'antd';

import FormContainer from '@components/FormContainer';

import type { WriteNoticeData } from '@type/notice';

import WriteNoticeForm from './Form';
import WriteNoticePreview from './Preview';
import * as S from './styled';

function WriteNotice() {
  //TODO: undefined 체크
  const [notice, setNotice] = useState<WriteNoticeData | undefined>({
    title: '',
    content: '',
    summary: '',
    visible: true,
  });

  return (
    <S.Container>
      <Row gutter={64} justify='space-between'>
        <Col md={14} sm={12} xs={24} className='form'>
          <FormContainer className='not-numbers'>
            <WriteNoticeForm notice={notice} setNotice={setNotice} />
          </FormContainer>
        </Col>
        <Col md={10} sm={12} xs={24}>
          <WriteNoticePreview notice={notice} />
        </Col>
      </Row>
    </S.Container>
  );
}

export default WriteNotice;
