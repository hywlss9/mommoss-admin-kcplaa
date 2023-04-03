import { useEffect, useState } from 'react';

import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import type { RootState } from '@reduce';

import FormContainer from '@components/FormContainer';

import type { Group } from '@type/group';

import BasicInfoForm from './Form';
import BasicInfoPreview from './Preview';
import * as S from './styled';

function BasicInfo() {
  const { groupInfo } = useSelector((state: RootState) => state.group);

  const [info, setInfo] = useState<Group | null>(groupInfo);

  useEffect(() => {
    if (!groupInfo) return;

    setInfo(groupInfo);
  }, [groupInfo]);

  if (!info) return <></>;

  return (
    <S.Container>
      <Row gutter={64} justify='space-between'>
        <Col md={14} sm={12} xs={24} className='form'>
          <FormContainer className='not-numbers'>
            <BasicInfoForm info={info} setInfo={setInfo} />
          </FormContainer>
        </Col>
        <Col md={10} sm={12} xs={24}>
          <BasicInfoPreview info={info} />
        </Col>
      </Row>
    </S.Container>
  );
}

export default BasicInfo;
