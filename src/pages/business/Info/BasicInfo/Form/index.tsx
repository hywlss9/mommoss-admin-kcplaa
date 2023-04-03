import { useState } from 'react';
import type { ChangeEvent } from 'react';

import { Button, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';

import type { RootState } from '@reduce';

import * as C from '@components/Common';

import * as S from './styled';
import type * as T from './type';

function SendMessageForm({ info, setInfo }: T.BusinessInfoFormProps) {
  const { groupInfo } = useSelector((state: RootState) => state.group);

  const [isUpdatingTeamName, setIsUpdatingTeamName] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleUpdateTeamName = () => setIsUpdatingTeamName(true);
  const cancelUpdateTeamName = () => {
    if (!groupInfo) return false;

    setInfo(groupInfo);
    setIsUpdatingTeamName(false);
  };

  const updateTeamName = () => {
    setIsUpdatingTeamName(false);
    message.success('저장되었습니다.');
  };

  const handleUpdatedNameValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setInfo(prevState => prevState && { ...prevState, name: value });

  if (!groupInfo) return <>사업장 정보를 불러오는 중 입니다.</>;

  return (
    <Form form={form} colon={false} labelCol={{ span: 5 }} labelAlign='left'>
      <Form.Item label='팀이름'>
        <C.FormRowBox>
          {isUpdatingTeamName ? (
            <Input value={info.name} onChange={handleUpdatedNameValue} />
          ) : (
            <S.TeamName>{groupInfo.name}</S.TeamName>
          )}
          {/* {isUpdatingTeamName ? (
            <>
              <Button type='primary' onClick={updateTeamName}>
                저장
              </Button>
              <Button onClick={cancelUpdateTeamName}>취소</Button>
            </>
          ) : (
            <Button onClick={handleUpdateTeamName}>팀 이름 변경</Button>
          )} */}
        </C.FormRowBox>
      </Form.Item>
      {/* <Form.Item label='팀 ID'>
        <Text>{groupInfo.id}</Text>
      </Form.Item>
      <Form.Item label='팀 이미지'>
        <C.FormRowBox>
          <Input value={info.profileImg || ''} />
          <Button>변경하기</Button>
        </C.FormRowBox>
        <Text size={12} color={colors.GRAY_ORIGIN_1} style={{ marginTop: '8px' }}>
          이미지 권장 사이즈는 60px * 60px 입니다. 배경화면은 투명으로 제작해주세요.
        </Text>
      </Form.Item>
      <Form.Item label='소유자'>
        <C.FormRowBox>
          <Text block={true}>{team.creator.name}</Text>
          <Text color={colors.BLUE_ORIGIN_1} underline={true}>
            소유자 이전
          </Text>
        </C.FormRowBox>
      </Form.Item> */}
    </Form>
  );
}

export default SendMessageForm;
