import { useState } from 'react';

import { Button, Checkbox, Form, Modal, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import useGetRoles from '@hooks/queries/group/useGetRoles';

import { updateMember } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import Text from '@components/Text';

import type { MemberData } from '@type/group';

import * as S from './styled';
import type * as T from './type';

function UpdateAdminModal({ admin }: T.UpdateAdminModalProps) {
  const { user, roles } = admin;

  const dispatch = useDispatch();

  const { data: allRoles } = useGetRoles();

  const [selectedRoles, setSelectedRoles] = useState<MemberData['roles']>(roles);

  const close = () => dispatch(closeModal('updateAdmin'));

  const save = async () => {
    const groupMemberId = admin.id;

    const response = await updateMember({
      path: { groupMemberId },
      data: { roleIds: selectedRoles.map(({ id }) => id) },
    });

    if (getIsResponseFalse(response)) return false;

    message.success('저장되었습니다.');
    trigger('SUCCESS_UPDATE_ADMIN');
    close();
  };

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='save' type='primary' onClick={save}>
      저장
    </Button>,
  ];

  return (
    <Modal open={true} title='관리자 설정 수정' footer={footerBtns} width='800px' onCancel={close}>
      <Form colon={false} labelCol={{ span: 3 }} labelAlign='left'>
        <Form.Item label='이름'>
          <Text>{user?.name}</Text>
        </Form.Item>
        <Form.Item label='아이디'>
          {/* @ts-ignore */}
          <Text>{admin.user?.account?.id}</Text>
        </Form.Item>
      </Form>
      <S.MenuBox>
        <Text weight={500}>접근 가능 메뉴</Text>
        <S.RoleBox>
          {allRoles.map(role => {
            const { id, name } = role;
            const isChecked = selectedRoles.map(({ id }) => id).includes(id);

            const handleRoles = ({ target: { checked } }: CheckboxChangeEvent) => {
              setSelectedRoles(prevState => {
                if (checked) return [...prevState, role];

                const findIndex = prevState.findIndex(v => v.id === id);
                return update(prevState, {
                  $splice: [[findIndex, 1]],
                });
              });
            };

            return (
              <Checkbox key={id} defaultChecked={isChecked} onChange={handleRoles}>
                {name}
              </Checkbox>
            );
          })}
        </S.RoleBox>
      </S.MenuBox>
    </Modal>
  );
}

export default UpdateAdminModal;
