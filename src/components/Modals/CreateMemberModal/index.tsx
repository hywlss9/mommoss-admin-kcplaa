import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { AutoComplete, Button, Form, Input, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { closeModal } from '@reduce/modals';

import useGetOrganization from '@hooks/queries/group/useGetOrganization';
import useGetPositions from '@hooks/queries/group/useGetPositions';

import { createMember } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import colors from '@constants/colors';

import { FormRowBox } from '@components/Common';
import Text from '@components/Text';

import type { CreateMemberData } from '@type/group';

import type * as T from './type';

const REQUIRE_DOT_MARGIN_RIGHT = { marginRight: '2px' };
//organization을 모두 org로 축약하여 작성함
function CreateMemberModal() {
  const dispatch = useDispatch();

  const [orgSearchValue, setOrgSearchValue] = useState<string | undefined>();
  const [positionsSearchValue, setPositionsSearchValue] = useState<string | undefined>();

  //TODO: 검색어가 바뀌면 서버에 계속 요청함 수정해야할듯
  const { data: org } = useGetOrganization({
    q: typeof orgSearchValue === 'string' && orgSearchValue.length < 3 ? undefined : orgSearchValue,
  });

  const { data: positions } = useGetPositions({
    q:
      typeof positionsSearchValue === 'string' && positionsSearchValue.length < 3
        ? undefined
        : positionsSearchValue,
  });

  const [memberInfo, setMemberInfo] = useState<CreateMemberData>({
    accountId: '',
    name: '',
    accountPassword: '',
  });

  const orgSelectData: T.SelectOption[] = useMemo(() => {
    return org.map(({ id, name }) => ({ value: String(id), label: name }));
  }, [org]);

  const positionsSelectData: T.SelectOption[] = useMemo(() => {
    return positions.map(({ id, name }) => ({ value: String(id), label: name }));
  }, [positions]);

  const setAutoPassword = () => {
    const uuid = uuidv4();
    const shortUuid = uuid.split('-')[0];
    setMemberInfo(prevState => ({ ...prevState, accountPassword: shortUuid }));
  };

  const orgSelect = (_: string, { value, label }: T.SelectOption) => {
    setOrgSearchValue(label);
    setMemberInfo(prevState => ({ ...prevState, teamId: value as number }));
  };

  const positionsSelect = (_: string, { value, label }: T.SelectOption) => {
    setPositionsSearchValue(label);
    setMemberInfo(prevState => ({ ...prevState, positionId: value as number }));
  };

  const handleMemberInfo = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setMemberInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const create = async () => {
    console.log({ memberInfo });
    const { accountId, accountPassword, name } = memberInfo;
    if (!name || !accountId || !accountPassword) {
      message.warning({ key: 'EMPTY_REQUIRE', content: '필수 항목을 모두 입력해주세요.' });
      return false;
    }

    const response = await createMember({ data: memberInfo });

    if (getIsResponseFalse(response)) return false;

    message.success('구성원이 추가되었습니다.');
    trigger('SUCCESS_CREATE_MEMBER');
    close();
  };

  const close = () => dispatch(closeModal('createMember'));

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='send' type='primary' onClick={create}>
      추가
    </Button>,
  ];

  return (
    <Modal open={true} title='구성원 추가' footer={footerBtns} width='800px' onCancel={close}>
      <Form layout='vertical' colon={false}>
        <Text size={12} weight={500}>
          <Text block={false} size={12} color={colors.RED_ORIGIN} style={REQUIRE_DOT_MARGIN_RIGHT}>
            *
          </Text>
          필수 항목
        </Text>
        <Form.Item
          label={
            <>
              <Text
                block={false}
                size={12}
                color={colors.RED_ORIGIN}
                style={REQUIRE_DOT_MARGIN_RIGHT}>
                *
              </Text>
              이름
            </>
          }>
          <Input name='name' placeholder='이름을 입력하세요' onChange={handleMemberInfo} />
        </Form.Item>
        <Form.Item
          label={
            <>
              <Text
                block={false}
                size={12}
                color={colors.RED_ORIGIN}
                style={REQUIRE_DOT_MARGIN_RIGHT}>
                *
              </Text>
              아이디
            </>
          }>
          <Input name='accountId' placeholder='아이디를 입력하세요' onChange={handleMemberInfo} />
        </Form.Item>
        <Form.Item
          label={
            <>
              <Text
                block={false}
                size={12}
                color={colors.RED_ORIGIN}
                style={REQUIRE_DOT_MARGIN_RIGHT}>
                *
              </Text>
              비밀번호 설정
            </>
          }>
          <FormRowBox>
            <Input.Password
              name='accountPassword'
              placeholder='비밀번호를 입력하세요'
              value={memberInfo.accountPassword}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              onChange={handleMemberInfo}
            />
            <Button onClick={setAutoPassword}>자동으로 설정</Button>
          </FormRowBox>
        </Form.Item>
        <Form.Item label='소속'>
          <AutoComplete
            placeholder='소속을 입력하세요'
            options={orgSelectData}
            value={orgSearchValue}
            onChange={setOrgSearchValue}
            onSelect={orgSelect}
          />
        </Form.Item>
        <Form.Item label='직위'>
          <AutoComplete
            placeholder='직위를 입력하세요'
            options={positionsSelectData}
            value={positionsSearchValue}
            onChange={setPositionsSearchValue}
            onSelect={positionsSelect}
          />
        </Form.Item>
        {/* <Form.Item label='역할'>
          <Select
            mode='multiple'
            placeholder='역할을 선택하세요'
            options={roleSelectData}
            // value={rolesSearchValue}
            onChange={asdf}
            onSelect={rolesSelect}
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
}

export default CreateMemberModal;
