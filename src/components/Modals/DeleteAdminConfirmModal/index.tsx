import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { trigger } from '@utils/globalEvents';

import Text from '@components/Text';

import type * as T from './type';

function DeleteAdminConfirmModal({ name }: T.DeleteAdminComfirmModalProps) {
  const dispatch = useDispatch();

  const deleteAdmin = () => {
    trigger('DELETE_ADMIN_CONFIRM_OK');
    close();
  };

  const close = () => dispatch(closeModal('deleteAdminConfirm'));

  const footerButtons = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='ok' type='primary' onClick={deleteAdmin}>
      해제
    </Button>,
  ];

  return (
    <Modal open={true} centered={true} closable={false} footer={footerButtons} onCancel={close}>
      <Text>{name}님을 관리자에서 해제하시겠습니까?</Text>
    </Modal>
  );
}

export default DeleteAdminConfirmModal;
