import { useState } from 'react';
import type { ChangeEvent } from 'react';

import { Button, Form, Input, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import { updateFamilyEvent } from '@api/event';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import Text from '@components/Text';

import type * as T from './type';

function RejectedFamilyEventModal({ id }: T.RejectFamilyEventModalProps) {
  const dispatch = useDispatch();

  const [rejectReason, setRejectReason] = useState<string>('');

  const close = () => dispatch(closeModal('rejectedFamilyEvent'));

  const confirm = async () => {
    if (!rejectReason) {
      message.error('반려사유를 입력해주세요.');
      return;
    }

    const response = await updateFamilyEvent({
      path: { eventId: id },
      data: { rejectReason, approved: false },
    });
    if (getIsResponseFalse(response)) return;

    message.success('반려 되었습니다.');
    trigger('SUCCESS_UPDATE_FAMILY_EVENT');
    close();
    dispatch(closeModal('approveFamilyEvent'));
  };

  const rejectReasonChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setRejectReason(value);
  };

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='send' type='primary' onClick={confirm}>
      확인
    </Button>,
  ];

  return (
    <Modal open={true} centered={true} footer={footerBtns} width='440px' onCancel={close}>
      <Form layout='vertical' colon={false}>
        <Text size={14}>해당 경조사를 반려하시겠습니까?</Text>
        <Form.Item>
          <Text weight={500} style={{ marginBottom: '10px' }}>
            반려사유
          </Text>
          <Input name='reject' placeholder='반려사유를 작성하세요.' onChange={rejectReasonChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default RejectedFamilyEventModal;
