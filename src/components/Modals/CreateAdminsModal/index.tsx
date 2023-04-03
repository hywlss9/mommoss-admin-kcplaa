import { useState } from 'react';

import { Button, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import useGetRoles from '@hooks/queries/group/useGetRoles';

import { updateMember } from '@api/group';

import { trigger } from '@utils/globalEvents';

import AllMembers from '@pages/business/Members/AllMembers';
import type { MemberTableData } from '@pages/business/Members/AllMembers/type';

function CreateAdminsModal() {
  const dispatch = useDispatch();

  const { data: roles } = useGetRoles();

  const [selectedMembers, setSelectedMembers] = useState<MemberTableData[]>([]);

  const create = async () => {
    const findAdminRole = roles.find(role => role.permissions[0].name === 'admin');

    if (!findAdminRole) return false;

    for await (const member of selectedMembers) {
      await updateMember({
        path: { groupMemberId: member.id },
        data: { roleIds: [findAdminRole.id] },
      });
    }

    message.success('회원을 관리자에 추가하였습니다.');
    trigger('SUCCESS_CREATE_ADMIN');
    close();
  };

  const close = () => dispatch(closeModal('createAssociation'));

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='send' type='primary' onClick={create}>
      추가
    </Button>,
  ];

  return (
    <Modal open={true} title='그룹 회원 추가' footer={footerBtns} width='800px' onCancel={close}>
      <AllMembers
        header={false}
        blackList={['organization', 'role', 'lastActivatedAt']}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
      />
    </Modal>
  );
}

export default CreateAdminsModal;
