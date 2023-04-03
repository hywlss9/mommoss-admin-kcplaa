import { useState } from 'react';

import { Button, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { createAssociationMembers, deleteAssociationMembers } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import AssociationGroupTable from '@pages/address-book/Association/Groups/Table';

import type { AssociationTableData } from '@type/group';

import type * as T from './type';

function MoveOrganizationMembers({
  selectedMembers,
  exitGroupId,
}: T.MoveAssocitionMembersModalProps) {
  const dispatch = useDispatch();

  const [selectedGroupId, setSelectedGroupId] = useState<number | undefined>();

  const close = () => dispatch(closeModal('moveAssociationMembers'));

  const select = (data: AssociationTableData, selected: boolean) => {
    console.log({ data, selected });
    if (!selected) return false;

    setSelectedGroupId(data.id);
  };

  const save = async () => {
    console.log({ selectedMembers, selectedGroupId });
    if (typeof selectedGroupId === 'undefined') return false;

    const memberIds: number[] = selectedMembers.map(({ userId }) => userId);

    const createResponse = await createAssociationMembers({
      path: { teamId: selectedGroupId },
      data: { memberIds },
    });
    const deleteResponse = await deleteAssociationMembers({
      path: { teamId: exitGroupId },
      data: { memberIds },
    });

    if (getIsResponseFalse(createResponse) || getIsResponseFalse(deleteResponse)) return false;

    message.success('저장되었습니다.');
    trigger('SUCCESS_MOVE_ASSOCIATION_MEMBERS');
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
      <AssociationGroupTable
        selectAssociationId={setSelectedGroupId}
        isMoveSelection={true}
        moveGroupSelect={select}
      />
    </Modal>
  );
}

export default MoveOrganizationMembers;
