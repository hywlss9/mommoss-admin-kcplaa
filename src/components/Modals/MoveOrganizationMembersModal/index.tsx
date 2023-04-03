import { useState } from 'react';

import { Button, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { createOrganizationMembers } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import Tree from '@pages/business/Organization/All/Tree';

import type * as T from './type';

function MoveOrganizationMembers({ selectedMembers }: T.MoveOrganizationMembersModalProps) {
  const dispatch = useDispatch();

  const [selectedOrganizationId, setSelectedOrganizationId] = useState<number | undefined>();

  const close = () => dispatch(closeModal('moveOrganizationMembers'));

  const save = async () => {
    console.log({ selectedMembers, selectedOrganizationId });
    if (typeof selectedOrganizationId === 'undefined') return false;

    const memberIds: number[] = selectedMembers.map(({ userId }) => userId);

    const response = await createOrganizationMembers({
      path: { teamId: selectedOrganizationId },
      data: { memberIds },
    });

    if (getIsResponseFalse(response)) {
      message.error('저장에 실패했습니다. 다시 시도해주세요.');
      return false;
    }

    message.success('저장되었습니다.');
    trigger('SUCCESS_MOVE_ORGANIZATION_MEMBERS');
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
    <Modal
      open={true}
      title='다른 조직으로 이동'
      footer={footerBtns}
      width='400px'
      bodyStyle={{ paddingTop: '12px' }}
      onCancel={close}>
      <Tree setSelectedOrganizationId={setSelectedOrganizationId} height={300} />
    </Modal>
  );
}

export default MoveOrganizationMembers;
