import { useState } from 'react';

import { Col, Row } from 'antd';

import FormContainer from '@components/FormContainer';

import type { SendPushData } from '@type/push';

import SendPushForm from './Form';
import SendPushPreview from './Preview';
import * as S from './styled';

function SendPush() {
  const [push, setPush] = useState<SendPushData>({
    title: '',
    link: '',
    groupMemberIds: [],
    teamIds: [],
    categoryId: -1,
    payload: {},
  });

  return (
    <S.Container>
      <Row gutter={64} justify='space-between'>
        <Col md={14} sm={12} xs={24} className='form'>
          <FormContainer>
            <SendPushForm push={push} setPush={setPush} />
          </FormContainer>
        </Col>
        <Col md={10} sm={12} xs={24}>
          <SendPushPreview push={push} />
        </Col>
      </Row>
    </S.Container>
  );
}

export default SendPush;
